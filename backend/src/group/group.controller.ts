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
import { User } from '../decorator/user.decorator';
import { Token } from '../token/dto/token.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Get()
    async list(): Promise<{ groups: Group[] }> {
        return { groups: await this.groupService.list() };
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Post()
    async create(
        @User() user: Token,
        @Body() body: CreateGroupDto) {
        const group = await this.groupService.create(body.name, body.maxHours);
        await this.groupService.add(user.userID, group.id);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditGroupDto,
    ) {
        await this.groupService.edit(id, body);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.groupService.delete(id);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Post('addUser')
    async addUser(@Body() body: UserGroupDto) {
        await this.groupService.add(body.userID, body.groupID);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Post('removeUser')
    async removeUser(@Body() body: UserGroupDto) {
        await this.groupService.remove(body.userID, body.groupID);
    }

    @ApiBearerAuth()
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
