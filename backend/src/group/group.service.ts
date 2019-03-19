import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { GroupRepositoryToken, UserRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ExecFileSyncOptionsWithStringEncoding } from 'child_process';

@Injectable()
export class GroupService {
    constructor(
        @Inject(GroupRepositoryToken)
        private readonly groupRepository: Repository<Group>,
        private readonly userService: UserService,
    ) {}

    async list(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async create(name: string): Promise<Group> {
        try {
            const group = new Group(name);
            await this.groupRepository.save(group);
            return group;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    public async edit(id: number, name: string) {
        await this.groupRepository.update(id, { name });
    }

    public async delete(id: number) {
        await this.groupRepository.delete(id);
    }

    public async add(nationalID: string, groupID: number) {
        // const group = await this.groupRepository.find({ relations: ["users"] });
        const group = await this.groupRepository
            .createQueryBuilder()
            .leftJoinAndSelect('group.users', 'user')
            .where('user.nationalID = :nationalID', { nationalID })
            .getOne();
        if (group) {
            throw new ConflictException('User already in group');
        } else {
            const user = this.userService.getUserWithNationalID(nationalID);
            if (user) {
                this.groupRepository
                    .createQueryBuilder()
                    .relation(Group, 'users')
                    .of(groupID)
                    .add(user);
                // group[0].users.push(user)
                // await this.groupRepository.save(group)
            } else {
                throw new ConflictException('User not found');
            }
        }
    }
}
