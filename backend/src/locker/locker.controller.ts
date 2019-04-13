import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { AddLockerResponseDto } from './dto/add-locker-response.dto';
import { EditLockerDto } from './dto/edit-locker.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { ListLockerResponseDto } from './dto/list-locker-response.dto';
import { LockerCurrentStatusResponseDto } from './dto/locker-current-status-response.dto';
import { LockerSerialDto } from './dto/locker-serial.dto';
import { LockerSecretDto } from './dto/locker-secret.dto';
import { RegisterLockerDto } from './dto/register-locker.dto';
import { LockerService } from './locker.service';
import { Locker } from '../entities/locker.entity';
import { ReportLockerStatusDto } from './dto/report-locker-status.dto';

@ApiUseTags('Locker')
@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @ApiOperation({
        title: 'List all locker',
    })
    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN, Role.USER)
    @Get()
    async list(): Promise<ListLockerResponseDto> {
        const lockers = await this.lockerService.findLockers({ joinWith: ['location'] });
        return { lockers };
    }

    @ApiOperation({
        title: 'Get locker current status',
    })
    @Get('status')
    async getCurrentStatus(@Query() query: LockerSerialDto): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.getLockerCurrentStatus(query.serialNumber);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN, Role.SUPERUSER)
    @Get('history/:id')
    async getHistory(@Param('id', new ParseIntPipe()) lockerID: number): Promise<Locker> {
        return await this.lockerService.findLocker({
            key: {
                lockerID,
            },
            joinWith: ['lockerInstances'],
            nestedJoin: ['lockerInstances.ownerUser'],
        });
    }

    @Get('isRegister')
    async checkRegister(@Query() query: LockerSerialDto): Promise<{ isActive: boolean }> {
        return {
            isActive: await this.lockerService.isLockerActiveBySerialNumber(query.serialNumber),
        };
    }

    @ApiOperation({
        title: 'Adding locker to system',
    })
    @Post()
    async addLocker(@Body() body: LockerSecretDto): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id, serial: locker.serialNumber };
    }

    @ApiBearerAuth()
    @Post('reportStatus')
    async reportStatus(@Body() body: ReportLockerStatusDto) {
        await this.lockerService.checkLockerLockStatus(body.serialNumber, body.isLocked);
    }

    @ApiBearerAuth()
    @ApiOperation({
        title: 'To register locker by using locker id (Make available)',
    })
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Post('register/:id')
    async registerLocker(@Param('id', new ParseIntPipe()) id: number, @Body() body: RegisterLockerDto) {
        await this.lockerService.registerLocker(id, body);
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Patch(':id')
    async edit(@Param('id', new ParseIntPipe()) id: number, @Body() body: EditLockerDto) {
        await this.lockerService.edit(id, body);
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.lockerService.delete(id);
    }

    @ApiOperation({
        title: 'To lock locker',
    })
    @Post('lock')
    async lock(@Body() body: LockerSerialDto): Promise<LockerCurrentStatusResponseDto> {
        return await this.lockerService.lock(body.serialNumber);
    }
}
