import { createConnection } from 'typeorm';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        imports: [ConfigModule],
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
            }),
    },
];
