import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database.module';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupService } from './group.service';

@Module({
    imports: [DatabaseModule, ConfigModule, UserModule],
    providers: [...groupProviders, GroupService],
    controllers: [GroupController],
    exports: [GroupService],
})
export class GroupModule {}
