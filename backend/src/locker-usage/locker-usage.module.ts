import { Module } from '@nestjs/common';
import { LockerUsageController } from './locker-usage.controller';
import { lockerUsageProviders } from './locker-usage.providers';
import { LockerUsageService } from './locker-usage.service';

@Module({
    providers: [...lockerUsageProviders, LockerUsageService],
    controllers: [LockerUsageController],
    exports: [LockerUsageService],
})
export class LockerUsageModule {}
