import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DbConnectionToken, LocationRepositoryToken } from '../constant';
import { Location } from '../entities/location.entity';

export const locationProviders: Provider[] = [
    {
        provide: LocationRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(Location),
        inject: [DbConnectionToken],
    },
];
