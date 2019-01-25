import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './config/config.service';
import { SequelizeToken } from './config';

export const databaseProviders = [
  {
    provide: SequelizeToken,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.mySQLServer,
        username: configService.mySQLUser,
        password: configService.mySQLPassword,
        database: configService.mySQLDatabaseName,
        port: 3306,
        logging: false,
        modelPaths: [__dirname + '/models'],
      });
      await sequelize.sync({
        alter: true,
      });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
