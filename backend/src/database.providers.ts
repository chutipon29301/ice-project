import { createConnection } from 'typeorm';
import { ConfigService } from './config/config.service';
import { DbConnectionToken } from './constant';
import { Provider } from '@nestjs/common';

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
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
    },
];
