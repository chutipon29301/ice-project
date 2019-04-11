import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ShareLockerService } from './share-locker.service';
import { Roles } from '../guard/role.decorator';
import { Role } from '../entities/user.entity';
import { User } from '../decorator/user.decorator';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { AddUserPermissionDto } from './dto/add-user-permission.dto';
import { RevokePermissionDto } from './dto/revoke-permission.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('Share Locker')
@Controller('share-locker')
export class ShareLockerController {

    constructor(private readonly shareLockerService: ShareLockerService) { }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('generateLink/:id')
    async generateInvitationLink(@Param('id', new ParseIntPipe()) id: number, @User() user: JwtToken) {
        const link = await this.shareLockerService.generateInvitationLink(id, user.nationalID);
        return { link };
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Post('addUserPermission')
    async addUserPermission(@User() user: JwtToken, @Body() body: AddUserPermissionDto) {
        await this.shareLockerService.addUserPermission(user.nationalID, body.accessCode);
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Post('revokePermission')
    async revokeUserPermission(@User() user: JwtToken, @Body() body: RevokePermissionDto) {
        await this.shareLockerService.revokeUserPermission(user.nationalID, body.nationalID, body.lockerID);
    }
}
