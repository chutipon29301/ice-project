import { UsersRepository } from '../config';
import Users from '../models/users.model';

export const roleProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
