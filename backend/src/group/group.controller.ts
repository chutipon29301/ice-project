import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { lockerGroupDto } from './dto/locker-group.dto';
import { userGroupDto } from './dto/user-group.dto';

@ApiUseTags('Group')
@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get()
    async list(): Promise<{ groups: Group[] }> {
        return { groups: await this.groupService.list() };
    }

    @Post()
    async create(@Body() body: CreateGroupDto) {
        const group = await this.groupService.create(body.name);
        return group;
    }

    @Patch(':id')
    async edit(@Param('id', new ParseIntPipe()) id: number, @Body() body: EditGroupDto) {
        await this.groupService.edit(id, body.name);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const group = await this.groupService.delete(id);
        return group;
    }

    @Post('addUserToGroup')
    async addUserToGroup(@Body() body: userGroupDto) {
        const group = await this.groupService.addUserGroup(body.nationalID, body.groupID);
        return group;
    }
    @Post('addLockerToGroup')
    async addLockerToGroup(@Body() body: lockerGroupDto) {
        const group = await this.groupService.addLockerGroup(body.lockerID, body.groupID);
        return group;
    }
}
