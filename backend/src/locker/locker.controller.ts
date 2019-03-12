import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Patch,
    Delete,
} from '@nestjs/common';
import { LockerService } from './locker.service';
import { LockerSecretDto } from './dto/locker-secret.dto';
import { AddLockerResponseDto } from './dto/add-locker-response.dto';
import { EditLockerDto } from './dto/edit-locker.dto';

@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @Get()
    async list() {
        return await this.lockerService.list();
    }

    @Post()
    async addLocker(
        @Body() body: LockerSecretDto,
    ): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id, serial: locker.serialNumber };
    }

    @Patch(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditLockerDto,
    ) {
        await this.lockerService.edit(id, body);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.lockerService.delete(id);
    }
}
