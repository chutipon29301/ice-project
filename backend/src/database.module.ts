import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders, ConfigService],
    exports: [...databaseProviders, ConfigService],
})
export class DatabaseModule {}
