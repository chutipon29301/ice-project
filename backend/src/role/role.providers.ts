import { RoleRepository } from '../config';
import Role from '../models/Role.model';

export const roleProviders = [
    {
        provide: RoleRepository,
        useValue: Role,
    },
];
