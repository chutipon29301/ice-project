import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ListLockerInstanceDto } from './dto/list-locker-instance.dto';
import { LockerInstanceDto } from './dto/locker-instance.dto';
import { LockerInstanceService } from './locker-instance.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { User } from '../decorator/user.decorator';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { UnlockLockerInstanceDto } from './dto/unlock-locker-instance.dto';

@ApiUseTags('Locker Instance')
@Controller('locker-instance')
export class LockerInstanceController {
    constructor(
        private readonly lockerInstanceService: LockerInstanceService,
    ) {}

    @Roles(Role.USER, Role.SUPERUSER)
    @Get('myLocker')
    async getMyLocker(@User() user: JwtToken): Promise<LockerInstance[]> {
        return await this.lockerInstanceService.findLockerInstancesByNationalID(
            user.nationalID,
        );
    }

    @ApiOperation({
        title: 'Get locker used history',
    })
    @Get(':id')
    async list(@Param('id') lockerID: number) {
        return await this.lockerInstanceService.findAllInstance(lockerID);
    }

    @ApiOperation({
        title: 'Create instance of locker when user start using locker',
    })
    @Post('createInstance')
    async createInstance(
        @User() user: JwtToken,
        @Body() body: LockerInstanceDto,
    ): Promise<LockerInstance> {
        return await this.lockerInstanceService.create(
            body.accessCode,
            user.nationalID,
        );
    }

    @Post('unlock')
    @Roles(Role.USER, Role.SUPERUSER)
    async unlockLocker(
        @User() user: JwtToken,
        @Body() body: UnlockLockerInstanceDto,
    ) {
        return this.lockerInstanceService.unlock(
            body.accessCode,
            user.nationalID,
        );
    }

    @Delete()
    @Roles(Role.ADMIN, Role.SUPERUSER)
    async deleteInstance(@Body() body: ListLockerInstanceDto) {
        return await this.lockerInstanceService.deleteInstance(
            body.lockerID,
            body.startTime,
        );
    }
}
