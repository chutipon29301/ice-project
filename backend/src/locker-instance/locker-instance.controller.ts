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
    @Roles(Role.USER)
    async createInstance(
        @User() user: JwtToken,
        @Body() body: LockerInstanceDto,
    ): Promise<LockerInstance> {
        return await this.lockerInstanceService.create(
            body.lockerID,
            user.nationalID,
        );
    }

    @Delete()
    async deleteInstance(@Body() body: ListLockerInstanceDto) {
        return await this.lockerInstanceService.deleteInstance(
            body.lockerID,
            body.startTime,
        );
    }
    @Post('unlock')
    @Roles(Role.USER)
    async unlockLocker(
        @User() user: JwtToken,
        @Body() body: UnlockLockerInstanceDto,
    ) {
        this.lockerInstanceService.unlock(body.accessCode, user.nationalID);
    }

    @Post('lock')
    async lockLocker(@Body() body: ListLockerInstanceDto) {
        this.lockerInstanceService.lock(body.lockerID, body.startTime);
    }
}
