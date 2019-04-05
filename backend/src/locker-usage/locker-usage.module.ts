import { Module } from '@nestjs/common';
import { lockerUsageProviders } from './locker-usage.providers';
import { LockerUsageService } from './locker-usage.service';

@Module({
    providers: [...lockerUsageProviders, LockerUsageService],
    exports: [LockerUsageService],
})
export class LockerUsageModule {}
