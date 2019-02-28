import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { databaseProviders } from '../database.providers';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';

@Module({
    imports: [DatabaseModule],
    providers: [...databaseProviders, LockerService],
    controllers: [LockerController],
})
export class LockerModule {}
