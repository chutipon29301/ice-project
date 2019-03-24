import { Provider } from '@nestjs/common';
import { DbConnectionToken, LockerUsageRepositoryToken } from 'src/constant';
import { LockerUsage } from 'src/entities/locker-usage.entity';
import { Connection } from 'typeorm';

export const lockerUsageProviders: Provider[] = [
    {
        provide: LockerUsageRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(LockerUsage),
        inject: [DbConnectionToken],
    },
];
