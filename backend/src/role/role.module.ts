import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { roleProviders } from './role.providers';

@Module({
    controllers: [RoleController],
    providers: [RoleService, ...roleProviders],
})
export class RoleModule {}
