import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { GroupRepository, UserGroupRepository } from 'src/config';
import Group from '../models/group.model';
import UserGroup from '../models/user-group.model';
import Users from '../models/users.model';

@Injectable()
export class GroupService {
    constructor(
        @Inject(GroupRepository) private readonly groupRepository: typeof Group,
        @Inject(UserGroupRepository)
        private readonly userGroupRepository: typeof UserGroup,
    ) { }

    async list(): Promise<Group[]> {
        return await this.groupRepository.findAll({
            raw: true,
        });
    }

    async create(name: string, maxHours: number): Promise<Group> {
        return await this.groupRepository.create({
            name,
            maxHours,
        });
    }

    async edit(id: number, value: Partial<Group>) {
        await this.groupRepository.update(value, { where: { id } });
    }

    async delete(id: number) {
        await this.groupRepository.destroy({ where: { id } });
    }

    async add(userID: number, groupID: number) {
        const userGroup = await this.userGroupRepository.findOne({
            where: { userID, groupID },
        });
        if (userGroup) {
            throw new ConflictException('User already in group');
        } else {
            await this.userGroupRepository.create({
                userID,
                groupID,
            });
        }
    }

    async remove(userID: number, groupID: number) {
        const userGroup = await this.userGroupRepository.findOne({
            where: { userID, groupID },
        });
        if (userGroup) {
            await userGroup.destroy();
        } else {
            throw new NotFoundException('UserGroup not exist');
        }
    }

    async detailOfGroupID(id: number): Promise<Group> {
        const group = await this.groupRepository.findByPk(id);
        if (group) {
            return group;
        } else {
            throw new NotFoundException('Group not found');
        }
    }

    async listUserInGroup(groupID: number): Promise<Users[]> {
        const group = await this.groupRepository.findByPk(groupID, {
            include: [{
                model: Users,
                required: false,
            }],
        });
        if (group) {
            return group.users;
        } else {
            throw new NotFoundException('Group not found');
        }
    }
}
