import { Body, Controller, Get, Post } from '@nestjs/common';
import Group from '../models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get()
    async list(): Promise<Group[]> {
        return await this.groupService.list();
    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        await this.groupService.create(
            createGroupDto.name,
            createGroupDto.maxHours,
        );
    }
}
