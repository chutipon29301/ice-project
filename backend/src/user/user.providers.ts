import { UserRepositoryToken, DbConnectionToken } from '../constant';
import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';

export const userProviders: Provider[] = [
    {
        provide: UserRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [DbConnectionToken],
    },
];
