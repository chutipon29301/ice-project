import { Module } from '@nestjs/common';
import { ShareLockerService } from './share-locker.service';
import { ShareLockerController } from './share-locker.controller';
import { shareLockerProviders } from './share-locker.provider';
import { UserModule } from '../user/user.module';
import { LockerInstanceModule } from '../locker-instance/locker-instance.module';

@Module({
    imports: [UserModule, LockerInstanceModule],
    providers: [...shareLockerProviders, ShareLockerService],
    controllers: [ShareLockerController],
})
export class ShareLockerModule {}
