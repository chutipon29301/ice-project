import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { AddLockerResponseDto } from './dto/add-locker-response.dto';
import { EditLockerDto } from './dto/edit-locker.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { ListLockerResponseDto } from './dto/list-locker-response.dto';
import { LockerCurrentStatusResponseDto } from './dto/locker-current-status-response.dto';
import { LockerLockDto } from './dto/locker-lock.dto';
import { LockerSecretDto } from './dto/locker-secret.dto';
import { RegisterLockerDto } from './dto/register-locker.dto';
import { LockerService } from './locker.service';
import { Locker } from '../entities/locker.entity';

@ApiUseTags('Locker')
@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @ApiOperation({
        title: 'List all locker',
    })
    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(): Promise<ListLockerResponseDto> {
        const lockers = await this.lockerService.findLockerAndLocation();
        return { lockers };
    }

    @ApiOperation({
        title: 'Get locker current status',
    })
    @Get('status')
    async getCurrentStatus(
        @Query('serialNumber') serialNumber: string,
    ): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.getLockerCurrentStatus(serialNumber);
    }

    @Roles(Role.ADMIN, Role.SUPERUSER)
    @Get('history/:id')
    async getHistory(
        @Param('id', new ParseIntPipe()) lockerID: number,
    ): Promise<Locker> {
        return this.lockerService.findLockerInstanceHistoryByLockerID(lockerID);
    }

    @ApiOperation({
        title: 'Adding locker to system',
    })
    @Post()
    async addLocker(
        @Body() body: LockerSecretDto,
    ): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id, serial: locker.serialNumber };
    }

    @ApiOperation({
        title: 'To register locker by using locker id (Make available)',
    })
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post('register/:id')
    async registerLocker(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: RegisterLockerDto,
    ) {
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

    @ApiOperation({
        title: 'To lock locker',
    })
    @Post('lock')
    async lock(
        @Body() body: LockerLockDto,
    ): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.lock(body.serialNumber);
    }
}
