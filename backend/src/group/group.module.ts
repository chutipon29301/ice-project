import { Module } from '@nestjs/common';
import { ShareLockerModule } from '../share-locker/share-locker.module';
import { UserModule } from '../user/user.module';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupService } from './group.service';

@Module({
    imports: [UserModule, ShareLockerModule],
    providers: [...groupProviders, GroupService],
    controllers: [GroupController],
    exports: [GroupService],
})
export class GroupModule { }
