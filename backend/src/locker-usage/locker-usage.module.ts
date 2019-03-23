import { Module } from '@nestjs/common';
import { LockerUsageService } from './locker-usage.service';
import { LockerUsageController } from './locker-usage.controller';
import { DatabaseModule } from 'src/database.module';
import { lockerUsageProviders } from './locker-usage.providers';

@Module({
    imports: [DatabaseModule],
    providers: [...lockerUsageProviders, LockerUsageService],
    controllers: [LockerUsageController],
    exports: [LockerUsageService],
})
export class LockerUsageModule { }
