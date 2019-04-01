import { Module } from '@nestjs/common';
import { ShareLockerService } from './share-locker.service';
import { ShareLockerController } from './share-locker.controller';
import { shareLockerProviders } from './share-locker.provider';
import { LockerInstanceModule } from '../locker-instance/locker-instance.module';

@Module({
    imports: [LockerInstanceModule],
    providers: [...shareLockerProviders, ShareLockerService],
    controllers: [ShareLockerController],
})
export class ShareLockerModule {}
