import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ListLockerInstanceDto } from './dto/list-locker-instance.dto';
import { LockerInstanceDto } from './dto/locker-instance.dto';
import { LockerInstanceService } from './locker-instance.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@ApiUseTags('Locker Instance')
@Controller('locker-instance')
export class LockerInstanceController {
    constructor(
        private readonly lockerInstanceService: LockerInstanceService,
    ) {}

    @ApiOperation({
        title: 'Get locker used history',
    })
    @Get(':id')
    async list(@Param('id') lockerID: number) {
        return await this.lockerInstanceService.getAllInstance(lockerID);
    }

    @ApiOperation({
        title: 'Create instance of locker when user start using locker',
    })
    @Post('createInstance')
    async createInstance(
        @Body() body: LockerInstanceDto,
    ): Promise<LockerInstance> {
        return await this.lockerInstanceService.create(
            body.lockerID,
            body.nationalID,
        );
    }

    @Delete()
    async deleteInstance(@Body() body: ListLockerInstanceDto) {
        return await this.lockerInstanceService.deleteInstance(
            body.lockerID,
            body.startTime,
        );
    }
}
