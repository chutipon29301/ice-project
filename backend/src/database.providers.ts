import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        import: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: configService.mySQLServer,
                username: configService.mySQLUser,
                password: configService.mySQLPassword,
                database: configService.mySQLDatabaseName,
            });
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
