import { Provider } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConfigService } from './config/config.service';
import { DbConnectionToken } from './constant';
import { join } from 'path';

export const databaseProviders: Provider[] = [
    {
        provide: DbConnectionToken,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) =>
            await createConnection({
                type: 'mysql',
                host: configService.mySQLServer,
                port: 3306,
                username: configService.mySQLUser,
                password: configService.mySQLPassword,
                database: configService.mySQLDatabase,
                entities: [join(__dirname, './entities/*.entity{.ts,.js}')],
                synchronize: true,
                logging: true,
            }),
    },
];
