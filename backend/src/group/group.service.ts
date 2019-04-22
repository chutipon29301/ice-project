import { Inject, Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Repository, FindConditions, Like } from 'typeorm';
import { GroupRepositoryToken } from '../constant';
import { Group } from '../entities/group.entity';
import { LockerService } from '../locker/locker.service';

@Injectable()
export class GroupService {
    constructor(
        @Inject(GroupRepositoryToken)
        private readonly groupRepository: Repository<Group>,
        private readonly userService: UserService,
        private readonly lockerService: LockerService,
    ) {}

    public async create(name: string): Promise<Group> {
        const group = new Group(name);
        return await this.groupRepository.save(group);
    }

    public async findGroup({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            groupID?: number;
        };
        throwError?: boolean;
        joinWith?: Array<keyof Group>;
        nestedJoin?: string[];
    }): Promise<Group> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<Group> = {};
        if (key.groupID) {
            where = { id: key.groupID };
        }
        if (throwError) {
            return await this.groupRepository.findOneOrFail({ where, relations });
        } else {
            return await this.groupRepository.findOne({ where, relations });
        }
    }

    public async findGroups({
        key,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {
            name?: string;
        };
        joinWith?: Array<keyof Group>;
        nestedJoin?: string[];
    }): Promise<Group[]> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: FindConditions<Group> = {};
        if (key.name) {
            where = { name: Like(`%${key.name}%`) };
        }
        return await this.groupRepository.find({ where, relations });
    }

    public async edit(id: number, name: string) {
        await this.groupRepository.update(id, { name });
    }

    public async delete(id: number) {
        try {
            await this.groupRepository.delete(id);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async addUserToGroup(nationalID: string, groupID: number) {
        try {
            const user = await this.userService.findUser({ key: { nationalID } });
            const group = await this.findGroup({ key: { groupID }, joinWith: ['users'] });
            group.users.push(user);
            await this.groupRepository.save(group);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new BadRequestException(error.message);
            }
        }
    }

    public async removeUserFromGroup(nationalID: string, groupID: number) {
        try {
            const group = await this.findGroup({ key: { groupID }, joinWith: ['users'] });
            const userIndex = group.users.findIndex(user => user.nationalID === nationalID);
            group.users.splice(userIndex, 1);
            await this.groupRepository.save(group);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new BadRequestException(error.message);
            }
        }
    }

    public async addLockerToGroup(lockerID: number, groupID: number) {
        try {
            const locker = await this.lockerService.findLocker({ key: { lockerID } });
            const group = await this.findGroup({ key: { groupID }, joinWith: ['lockers'] });
            group.lockers.push(locker);
            await this.groupRepository.save(group);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new BadRequestException(error.message);
            }
        }
    }

    public async removeLockerFromGroup(lockerID: number, groupID: number) {
        try {
            const group = await this.findGroup({ key: { groupID }, joinWith: ['lockers'] });
            const lockerIndex = group.lockers.findIndex(locker => locker.id === lockerID);
            group.lockers.splice(lockerIndex, 1);
            await this.groupRepository.save(group);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new BadRequestException(error.message);
            }
        }
    }
}
