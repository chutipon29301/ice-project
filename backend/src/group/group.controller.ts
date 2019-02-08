import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { Roles } from '../guard/role.decorator';
import Group from '../models/group.model';
import Users, { Role } from '../models/users.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { UserGroupDto } from './dto/user-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Roles(Role.ADMIN)
    @Get()
    async list(): Promise<{ groups: Group[] }> {
        return { groups: await this.groupService.list() };
    }

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() body: CreateGroupDto) {
        await this.groupService.create(body.name, body.maxHours);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditGroupDto,
    ) {
        await this.groupService.edit(id, body);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.groupService.delete(id);
    }

    @Roles(Role.ADMIN)
    @Post('addUser')
    async addUser(@Body() body: UserGroupDto) {
        await this.groupService.add(body.userID, body.groupID);
    }

    @Roles(Role.ADMIN)
    @Post('removeUser')
    async removeUser(@Body() body: UserGroupDto) {
        await this.groupService.remove(body.userID, body.groupID);
    }

    @Roles(Role.ADMIN)
    @Get('detail/:id')
    async detail(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<{ group: Group; users: Users[] }> {
        const group = await this.groupService.detailOfGroupID(id);
        const users = await this.groupService.listUserInGroup(id);
        return {
            group,
            users,
        };
    }
}
