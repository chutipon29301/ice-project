import { Body, Controller, Delete, Get, Post, Query, UnauthorizedException } from '@nestjs/common';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ListLockerInstanceDto } from './dto/list-locker-instance.dto';
import { LockerInstanceDto } from './dto/locker-instance.dto';
import { LockerInstanceService } from './locker-instance.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { User } from '../decorator/user.decorator';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { AccessLockerInstanceDto } from './dto/access-locker-instance.dto';
import { LockerInstanceArrayDto } from './dto/locker-instance-array.dto';
import { UserArrayDto } from './dto/user-array.dto';
import { LockerInUsedDto } from './dto/locker-in-used.dto';
import { AccessibleLockerDto } from './dto/accessible-locker.dto';

@ApiUseTags('Locker Instance')
@Controller('locker-instance')
export class LockerInstanceController {
    constructor(private readonly lockerInstanceService: LockerInstanceService) {}
    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('myLocker')
    async getMyLocker(@User() user: JwtToken): Promise<LockerInstanceArrayDto> {
        const lockerInstances = await this.lockerInstanceService.findInstances({
            key: {
                inUsedByNationalID: user.nationalID,
            },
            joinWith: ['locker', 'ownerUser'],
            nestedJoin: ['locker.location'],
        });
        return { lockerInstances };
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN, Role.SUPERUSER)
    @Get('inUsedLockers')
    async getInUsedLocker(): Promise<LockerInstanceArrayDto> {
        const lockerInstances = await this.lockerInstanceService.findInstances({ key: { inUsed: true }, joinWith: ['ownerUser'] });
        return { lockerInstances };
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('isInUsed')
    async isInUsedLocker(@Query() query: AccessLockerInstanceDto): Promise<LockerInUsedDto> {
        const isInUsed = await this.lockerInstanceService.lockerIsInUsed(query.accessCode);
        return { isInUsed };
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('accessibleUsers')
    async getAccessibleUsers(@User() user: JwtToken, @Query() query: AccessibleLockerDto): Promise<UserArrayDto> {
        const lockerInstance = await this.lockerInstanceService.findInstance({
            key: {
                ownerOf: {
                    lockerID: query.lockerID,
                    ownerID: user.nationalID,
                },
            },
            joinWith: ['canAccesses'],
            nestedJoin: ['canAccesses.accessibleUser'],
        });
        return { users: lockerInstance.canAccesses.map(canAccessRelation => canAccessRelation.accessibleUser) };
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('sharedLockerInstances')
    async getSharedLockerInstances(@User() user: JwtToken): Promise<LockerInstanceArrayDto> {
        const canAccessRelations = await this.lockerInstanceService.findCanAccessRelations({
            key: {
                nationalID: user.nationalID,
            },
            joinWith: ['accessibleLockerInstance'],
            nestedJoin: ['accessibleLockerInstance.locker', 'accessibleLockerInstance.locker.location', 'accessibleLockerInstance.ownerUser'],
        });
        return { lockerInstances: canAccessRelations.map(canAccessRelation => canAccessRelation.accessibleLockerInstance) };
    }

    @ApiOperation({
        title: 'Create instance of locker when user start using locker',
    })
    @Post('createInstance')
    async createInstance(@User() user: JwtToken, @Body() body: LockerInstanceDto): Promise<LockerInstance> {
        return await this.lockerInstanceService.create(body.accessCode, user.nationalID);
    }

    @Post('return')
    async returnInstance(@User() user: JwtToken, @Body() body: LockerInstanceDto) {
        await this.lockerInstanceService.returnInstance(user.nationalID, body.accessCode);
    }

    @ApiBearerAuth()
    @Post('unlock')
    @Roles(Role.USER, Role.SUPERUSER)
    async unlockLocker(@User() user: JwtToken, @Body() body: AccessLockerInstanceDto) {
        return await this.lockerInstanceService.unlock(user.nationalID, body.accessCode);
    }

    @ApiBearerAuth()
    @Delete()
    @Roles(Role.ADMIN, Role.SUPERUSER)
    async deleteInstance(@Body() body: ListLockerInstanceDto) {
        return await this.lockerInstanceService.deleteInstance(body.lockerID, body.startTime);
    }
}
