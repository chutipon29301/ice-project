import { UsersRepository } from '../config';
import Users from '../models/Users.model';

export const tokenProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
