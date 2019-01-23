import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from './config/config.module';
import { SequelizeToken } from './config';
import { ConfigService } from './config/config.service';
import { Sequelize } from 'sequelize-typescript';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
