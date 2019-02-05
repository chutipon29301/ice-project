import { RoleRepository } from '../config';
import Role from '../models/role.model';

export const roleProviders = [
    {
        provide: RoleRepository,
        useValue: Role,
    },
];
