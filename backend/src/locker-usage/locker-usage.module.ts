import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { LockerUsageController } from './locker-usage.controller';
import { lockerUsageProviders } from './locker-usage.providers';
import { LockerUsageService } from './locker-usage.service';

@Module({
    imports: [DatabaseModule],
    providers: [...lockerUsageProviders, LockerUsageService],
    controllers: [LockerUsageController],
    exports: [LockerUsageService],
})
export class LockerUsageModule {}
