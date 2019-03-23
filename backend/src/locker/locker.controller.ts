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
import { ApiUseTags } from '@nestjs/swagger';
import { RegisterLockerDto } from './dto/register-locker.dto';
import { Roles } from 'src/guard/role.decorator';
import { Role } from 'src/entities/user.entity';
import { ListLockerResponseDto } from './dto/list-locker-response.dto';
import { LockerCurrentStatusResponseDto } from './dto/locker-current-status-response.dto';
import { LockerLockDto } from './dto/locker-lock.dto';

@ApiUseTags('Locker')
@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) { }

    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(): Promise<ListLockerResponseDto> {
        const lockers = await this.lockerService.list();
        return { lockers };
    }

    @Get('status')
    async getCurrentStatus(@Query('serialNumber') serialNumber: string): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.getLockerCurrentStatus(serialNumber);
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post()
    async addLocker(
        @Body() body: LockerSecretDto,
    ): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id, serial: locker.serialNumber };
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post('register/:id')
    async registerLocker(
        @Param('id', new ParseIntPipe()) id: number, @Body() body: RegisterLockerDto) {
        await this.lockerService.registerLocker(id, body);
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Patch(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditLockerDto,
    ) {
        await this.lockerService.edit(id, body);
    }

    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.lockerService.delete(id);
    }

    @Post('lock')
    async lock(@Body() body: LockerLockDto): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.lock(body.serialNumber);
    }
}
