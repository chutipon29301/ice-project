import { UsersRepository } from '../config';
import Users from '../models/users.model';

export const userProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
