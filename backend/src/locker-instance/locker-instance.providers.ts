import { Provider } from '@nestjs/common';
import { LockerInstanceRepositoryToken, DbConnectionToken } from 'src/constant';
import { Connection } from 'typeorm';
import { LockerInstance } from 'src/entities/locker-instance.entity';

export const lockerInstanceProviders: Provider[] = [
    {
        provide: LockerInstanceRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(LockerInstance),
        inject: [DbConnectionToken],
    },
];
