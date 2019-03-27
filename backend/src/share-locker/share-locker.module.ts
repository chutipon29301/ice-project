import { Module } from '@nestjs/common';
import { ShareLockerService } from './share-locker.service';
import { ShareLockerController } from './share-locker.controller';
import { shareLockerProviders } from './share-locker.provider';
import { DatabaseModule } from '../database.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [...shareLockerProviders, ShareLockerService],
    controllers: [ShareLockerController],
})
export class ShareLockerModule {}
