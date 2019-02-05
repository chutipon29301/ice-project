import {
    Controller,
    Get,
    Body,
    Post,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { LockerService } from './locker.service';
import Locker from '../models/Locker.model';
import { CreateLockerDto } from './dto/create-locker.dto';
import { EditLockerDto } from './dto/edit-locker.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @ApiBadRequestResponse({description: 'cannot get list of lockers'})
    @Get()
    async listLocker(): Promise<Locker[]> {
        return await this.lockerService.list();
    }

    @ApiCreatedResponse({description: 'new locker is created successfully'})
    @ApiBadRequestResponse({description: 'cannot create locker'})
    @Post()
    async addLocker(@Body() createLockerDto: CreateLockerDto) {
        await this.lockerService.create(
            createLockerDto.name,
            createLockerDto.locationID,
            createLockerDto.number,
        );
    }

    @ApiOkResponse({description: 'editting data is succesful'})
    @ApiBadRequestResponse({description: 'cannot edit data'})
    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editLockerDto: EditLockerDto) {
        await this.lockerService.edit(parseInt(id, 10), editLockerDto);
    }

    @ApiOkResponse({description: 'locker is deleted'})
    @ApiBadRequestResponse({description: 'cannot delete the locker'})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.lockerService.delete(parseInt(id, 10));
    }
}
