import {
    Controller,
    Get,
    Body,
    Post,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { LockerService } from './locker.service';
import Locker, { LockerStatus } from '../models/locker.model';
import { EditLockerDto } from './dto/edit-locker.dto';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBadRequestResponse,
    ApiUseTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../guard/role.decorator';
import { Role } from '../models/users.model';
import { User } from '../decorator/user.decorator';
import { Token } from '../token/dto/token.dto';
import { LockerSecretDto } from './dto/locker-secret.dto';
import { AddLockerResponseDto } from './dto/add-locker-response.dto';
import { LockerStatusQueryDto } from './dto/locker-status-query.dto';
import { CurrentStatus } from '../models/locker-stat.model';
import { EditRegisterLockerDto } from './dto/edit-register-locker-dto';

@ApiUseTags('locker')
@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @ApiBearerAuth()
    @ApiBadRequestResponse({ description: 'cannot get list of lockers' })
    @Roles(Role.USER, Role.ADMIN)
    @Get()
    async listLocker(): Promise<Locker[]> {
        return await this.lockerService.list(LockerStatus.AVAILABLE);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @Get('list')
    async list(@Query() query: LockerStatusQueryDto): Promise<Locker[]> {
        return await this.lockerService.list(...query.s);
    }

    @ApiCreatedResponse({ description: 'new locker is created successfully' })
    @ApiBadRequestResponse({ description: 'cannot create locker' })
    @Post()
    async addLocker(
        @Body() body: LockerSecretDto,
    ): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id, serial: locker.serial };
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'editing data is successful' })
    @ApiBadRequestResponse({ description: 'cannot edit data' })
    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditLockerDto,
    ) {
        await this.lockerService.edit(id, body);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'editing register data is successful' })
    @ApiBadRequestResponse({
        description: 'cannot edit and change status of registered locker',
    })
    @Roles(Role.ADMIN)
    @Patch('register/:id')
    async editRegisterLocker(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: EditRegisterLockerDto,
    ) {
        await this.lockerService.editRegisterLocker(id, body, user.userID);
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'locker is deleted' })
    @ApiBadRequestResponse({ description: 'cannot delete the locker' })
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        await this.lockerService.delete(id);
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @Post('reserve/:id')
    async reserveLocker(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        await this.lockerService.reserve(user.userID, id);
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @Post('checkout/:id')
    async checkoutLocker(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        await this.lockerService.checkout(user.userID, id);
    }

    @Get('status/:id')
    async status(@Param('id', new ParseIntPipe()) id: number) {
        return await this.lockerService.status(id);
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @Post('lock/:id')
    async lock(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        await this.lockerService.triggerLock(
            id,
            user.userID,
            CurrentStatus.LOCK,
        );
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @Post('unlock/:id')
    async unlock(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        await this.lockerService.triggerLock(
            id,
            user.userID,
            CurrentStatus.UNLOCK,
        );
    }
}
