import { UsersRepository } from '../config';
import Users from '../models/User.model';

export const userProviders = [
    {
        provide: UsersRepository,
        useValue: Users,
    },
];
