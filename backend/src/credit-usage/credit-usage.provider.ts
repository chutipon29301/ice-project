import { Provider } from '@nestjs/common';
import {
    
    DbConnectionToken,
    CreditUsageRepositoryToken,
} from '../constant';
import { Connection } from 'typeorm';
import { CreditUsage } from 'src/entities/credit-usage.entity';

export const creditUsageProviders: Provider[] = [
    {
        provide: CreditUsageRepositoryToken,
        useFactory: (connection: Connection) =>
            connection.getRepository(CreditUsage),
        inject: [DbConnectionToken],
    },
];
