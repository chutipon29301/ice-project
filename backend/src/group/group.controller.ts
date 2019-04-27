import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { LockerGroupDto } from './dto/locker-group.dto';
import { UserGroupDto } from './dto/user-group.dto';
import { GroupDto } from './dto/groups.dto';
import { Group } from '../entities/group.entity';

@ApiUseTags('Group')
@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Get()
    async list(): Promise<GroupDto> {
        // TODO: add query parameter
        return {
            groups: await this.groupService.findGroups({}),
        };
    }

    @Get('/:id')
    async detail(@Param('id', new ParseIntPipe()) id: number): Promise<Group> {
        return await this.groupService.findGroup({ key: { groupID: id }, joinWith: ['users'] });
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
    async addUserToGroup(@Body() body: UserGroupDto) {
        await this.groupService.addUserToGroup(body.nationalID, body.groupID);
    }
    @Post('addLockerToGroup')
    async addLockerToGroup(@Body() body: LockerGroupDto) {
        await this.groupService.addLockerToGroup(body.lockerID, body.groupID);
    }

    @Delete('removeUserFromGroup')
    async removeUserFromGroup(@Body() body: UserGroupDto) {
        await this.groupService.removeUserFromGroup(body.nationalID, body.groupID);
    }

    @Delete('removeLockerFromGroup')
    async removeLockerFromGroup(@Body() body: LockerGroupDto) {
        await this.groupService.removeLockerFromGroup(body.lockerID, body.groupID);
    }
}
