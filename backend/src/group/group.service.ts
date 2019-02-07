import { Injectable, Inject } from '@nestjs/common';
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
    ) {}

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
        await this.userGroupRepository.create({
            userID,
            groupID,
        });
    }

    async remove(userID: number, groupID: number) {
        await this.userGroupRepository.destroy({ where: { userID, groupID } });
    }

    async detailOfGroupID(id: number): Promise<Group> {
        const group = await this.groupRepository.findByPk(id);
        return group;
    }

    async listUserInGroup(groupID: number): Promise<Users[]> {
        const group = await this.groupRepository.findByPk(groupID, {
            include: [Users],
        });
        return group.users;
    }
}
