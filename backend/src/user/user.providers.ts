import { UsersRepository } from '../config';
import Users from '../models/Users.model';

export const userProviders = [
  {
    provide: UsersRepository,
    useValue: Users,
  },
];
