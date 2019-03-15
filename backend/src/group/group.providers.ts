import { Provider } from '@nestjs/common';
import { GroupRepositoryToken, DbConnectionToken } from '../constant';
import { Connection } from 'typeorm';
import { Group } from '../entities/group.entity';

export const groupProviders: Provider[] = [
    {
        provide: GroupRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(Group),
        inject: [DbConnectionToken],
    },
];