import { UsersRepository } from '../config';
import Users from '../models/users.model';

export const tokenProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
