import { Provider } from '@nestjs/common';
import { LockerInstanceRepositoryToken, DbConnectionToken, CanAccessRelationRepositoryToken } from '../constant';
import { Connection } from 'typeorm';
import { LockerInstance } from '../entities/locker-instance.entity';
import { CanAccessRelation } from '../entities/can-access.entity';

export const lockerInstanceProviders: Provider[] = [
    {
        provide: LockerInstanceRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(LockerInstance),
        inject: [DbConnectionToken],
    },
    {
        provide: CanAccessRelationRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(CanAccessRelation),
        inject: [DbConnectionToken],
    },
];
