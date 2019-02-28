import { Provider } from '@nestjs/common';
import { LockerRepositoryToken, DbConnectionToken } from '../constant';
import { Connection } from 'typeorm';
import { Locker } from '../entities/locker.entity';

export const lockerProviders: Provider[] = [
    {
        provide: LockerRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(Locker),
        inject: [DbConnectionToken],
    },
];
