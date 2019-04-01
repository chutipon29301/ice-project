import { forwardRef, Module } from '@nestjs/common';
import { LocationModule } from '../location/location.module';
import { LockerInstanceModule } from '../locker-instance/locker-instance.module';
import { LockerUsageModule } from '../locker-usage/locker-usage.module';
import { LockerController } from './locker.controller';
import { lockerProviders } from './locker.providers';
import { LockerService } from './locker.service';

@Module({
    imports: [
        LocationModule,
        LockerUsageModule,
        forwardRef(() => LockerInstanceModule),
    ],
    providers: [...lockerProviders, LockerService],
    controllers: [LockerController],
    exports: [LockerService],
})
export class LockerModule {}
