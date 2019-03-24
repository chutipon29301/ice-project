import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnectionToken, LockerRepositoryToken } from '../constant';
import { Locker } from '../entities/locker.entity';

export const lockerProviders: Provider[] = [
    {
        provide: LockerRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(Locker),
        inject: [DbConnectionToken],
    },
];
