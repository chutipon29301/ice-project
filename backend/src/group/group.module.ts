import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { DatabaseModule } from 'src/database.module';
import { groupProviders } from './group.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [GroupController],
    providers: [GroupService, ...groupProviders],
})
export class GroupModule {}
