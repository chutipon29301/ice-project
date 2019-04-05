import { Module, forwardRef } from '@nestjs/common';
import { LockerInstanceService } from './locker-instance.service';
import { LockerInstanceController } from './locker-instance.controller';
import { lockerInstanceProviders } from './locker-instance.providers';
import { LockerModule } from 'src/locker/locker.module';
import { UserModule } from '../user/user.module';
import { QrModule } from '../qr/qr.module';
import { LockerUsageModule } from '../locker-usage/locker-usage.module';
import { LocationModule } from '../location/location.module';
import { CreditUsageModule } from 'src/credit-usage/credit-usage.module';

@Module({
    imports: [forwardRef(() => LockerModule), UserModule, QrModule, CreditUsageModule],
    providers: [
        ...lockerInstanceProviders,
        LockerInstanceService,
        LockerUsageModule,
        LocationModule,
        CreditUsageModule,
    ],
    controllers: [LockerInstanceController],
    exports: [
        LockerInstanceService,
        LockerModule,
        LocationModule,
        QrModule,
        UserModule,
    ],
})
export class LockerInstanceModule { }
