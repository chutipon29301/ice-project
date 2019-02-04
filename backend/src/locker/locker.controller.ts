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

@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @Get()
    async listLocker(): Promise<Locker[]> {
        return await this.lockerService.list();
    }

    @Post()
    async addLocker(@Body() createLockerDto: CreateLockerDto) {
        await this.lockerService.create(
            createLockerDto.name,
            createLockerDto.locationID,
            createLockerDto.number,
        );
    }

    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editLockerDto: EditLockerDto) {
        await this.lockerService.edit(parseInt(id, 10), editLockerDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.lockerService.delete(parseInt(id, 10));
    }
}
