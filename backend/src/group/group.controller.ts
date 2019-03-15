import { Controller, Get } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from '../entities/group.entity';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }
    @Get()
    async list(): Promise<{ groups: Group[] }> {
        return { groups: await this.groupService.list() };
    }
}
