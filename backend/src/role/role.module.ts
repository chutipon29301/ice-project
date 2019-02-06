import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { DatabaseModule } from '../database.module';
import { roleProviders } from './role.providers';

@Module({
    imports: [DatabaseModule],
    providers: [RoleService, ...roleProviders],
    exports: [RoleService],
})
export class RoleModule {}
