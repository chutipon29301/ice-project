import {
    ConflictException,
    Inject,
    Injectable,
    HttpException,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { GroupRepositoryToken } from '../constant';
import { Group } from '../entities/group.entity';

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
            try {
                const user = this.userService.findUserWithNationalIDOrFail(
                    nationalID,
                );
                this.groupRepository
                    .createQueryBuilder()
                    .relation(Group, 'users')
                    .of(groupID)
                    .add(user);
            } catch (error) {
                if (error instanceof HttpException) {
                    throw error;
                } else {
                    throw new NotFoundException(error.message);
                }
            }
        }
    }
}
