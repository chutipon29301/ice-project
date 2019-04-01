import { Module, forwardRef } from '@nestjs/common';
import { LockerInstanceService } from './locker-instance.service';
import { LockerInstanceController } from './locker-instance.controller';
import { lockerInstanceProviders } from './locker-instance.providers';
import { LockerModule } from 'src/locker/locker.module';
import { UserModule } from '../user/user.module';
import { LockerUsageModule } from '../locker-usage/locker-usage.module';
import { QrModule } from '../qr/qr.module';

@Module({
    imports: [
        forwardRef(() => LockerModule),
        UserModule,
        LockerUsageModule,
        QrModule,
    ],
    providers: [...lockerInstanceProviders, LockerInstanceService],
    controllers: [LockerInstanceController],
    exports: [LockerInstanceService],
})
export class LockerInstanceModule {}
