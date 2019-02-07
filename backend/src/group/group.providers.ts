import { GroupRepository, UserGroupRepository } from '../config';
import Group from '../models/group.model';
import UserGroup from '../models/user-group.model';

export const groupProviders = [
    {
        provide: GroupRepository,
        useValue: Group,
    },
    {
        provide: UserGroupRepository,
        useValue: UserGroup,
    },
];
