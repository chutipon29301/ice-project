import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '../config/config.module';
import { groupProviders } from './group.providers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UserModule],
  providers: [...groupProviders, GroupService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
