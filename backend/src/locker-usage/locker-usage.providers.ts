import { Provider } from '@nestjs/common';
import { LockerUsageRepositoryToken, DbConnectionToken } from 'src/constant';
import { Connection } from 'typeorm';
import { LockerUsage } from 'src/entities/locker-usage.entity';

export const lockerUsageProviders: Provider[] = [
    {
        provide: LockerUsageRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(LockerUsage),
        inject: [DbConnectionToken],
    },
];
