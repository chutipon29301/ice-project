import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnectionToken, GroupRepositoryToken } from '../constant';
import { Group } from '../entities/group.entity';

export const groupProviders: Provider[] = [
    {
        provide: GroupRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(Group),
        inject: [DbConnectionToken],
    },
];
