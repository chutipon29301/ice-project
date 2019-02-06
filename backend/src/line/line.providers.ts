import { UsersRepository } from '../config';
import Users from '../models/users.model';

export const lineProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
