import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { lockerProviders } from './locker.providers';
import { ConfigModule } from '../config/config.module';
import { LocationModule } from '../location/location.module';
import { LockerUsageModule } from '../locker-usage/locker-usage.module';
import { LockerInstanceModule } from '../locker-instance/locker-instance.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule,
        LocationModule,
        LockerUsageModule,
        forwardRef(() => LockerInstanceModule),
    ],
    providers: [...lockerProviders, LockerService],
    controllers: [LockerController],
    exports: [LockerService],
})
export class LockerModule {}
