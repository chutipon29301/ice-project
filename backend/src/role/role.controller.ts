import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { RoleService } from './role.service';
import Role from '../models/Role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { EditRoleDto } from './dto/edit-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    async listRole(): Promise<Role[]> {
        return await this.roleService.list();
    }

    @Post()
    async addRole(@Body() createRoleDto: CreateRoleDto) {
        await this.roleService.create(
            createRoleDto.name,
            createRoleDto.maxHours,
        );
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editRoleDto: EditRoleDto) {
        await this.roleService.edit(parseInt(id, 10), editRoleDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.roleService.delete(parseInt(id, 10));
    }
}
