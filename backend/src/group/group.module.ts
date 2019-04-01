import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupService } from './group.service';

@Module({
    imports: [UserModule],
    providers: [...groupProviders, GroupService],
    controllers: [GroupController],
    exports: [GroupService],
})
export class GroupModule {}
