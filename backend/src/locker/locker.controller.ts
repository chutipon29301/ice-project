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
} from '@nestjs/swagger';
import { Roles } from '../guard/role.decorator';
import { Role } from '../models/users.model';
import { User } from '../decorator/user.decorator';
import { Token } from '../token/dto/token.dto';
import { LockerSecretDto } from './dto/locker-secret.dto';
import { AddLockerResponseDto } from './dto/add-locker-response.dto';
import { LockerStatusQueryDto } from './dto/locker-status-query.dto';

@ApiUseTags('locker')
@Controller('locker')
export class LockerController {
    constructor(private readonly lockerService: LockerService) {}

    @ApiBadRequestResponse({ description: 'cannot get list of lockers' })
    @Roles(Role.USER, Role.ADMIN)
    @Get()
    async listLocker(): Promise<Locker[]> {
        return await this.lockerService.list(LockerStatus.AVAILABLE);
    }

    @Roles(Role.ADMIN)
    @Get('list')
    async list(@Query() query: LockerStatusQueryDto): Promise<Locker[]> {
        return await this.lockerService.list(...query.status);
    }

    @ApiCreatedResponse({ description: 'new locker is created successfully' })
    @ApiBadRequestResponse({ description: 'cannot create locker' })
    @Post()
    async addLocker(
        @Body() body: LockerSecretDto,
    ): Promise<AddLockerResponseDto> {
        const locker = await this.lockerService.create(body.secret);
        return { id: locker.id };
    }

    @ApiOkResponse({ description: 'editing data is successful' })
    @ApiBadRequestResponse({ description: 'cannot edit data' })
    @Roles(Role.ADMIN)
    @Patch(':id')
    async edit(@Param('id') id: string, @Body() editLockerDto: EditLockerDto) {
        await this.lockerService.edit(parseInt(id, 10), editLockerDto);
    }

    @ApiOkResponse({ description: 'locker is deleted' })
    @ApiBadRequestResponse({ description: 'cannot delete the locker' })
    @Roles(Role.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.lockerService.delete(parseInt(id, 10));
    }

    @Roles(Role.USER)
    @Post('reserve/:id')
    async reserveLocker(
        @User() user: Token,
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        await this.lockerService.reserve(user.userID, id);
    }

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
}
