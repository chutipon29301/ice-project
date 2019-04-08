import { Body, Controller, Get, Post, Query, Res, UnauthorizedException } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { LineAccessToken } from 'src/line-auth/dto/line-access-token.dto';
import { JwtTokenInfo } from '../jwt-auth/dto/jwt-encrypt-token.dto';
import { AuthService } from './auth.service';
import { LineUserTokenDto } from './dto/line-user-token.dto';
import { RequestTokenDto } from './dto/request-token.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        title: 'Request short token from line for user,admin,superuser to register',
    })
    @Get('lineLoginPage')
    async lineAuth(@Res() res: Response) {
        res.redirect(this.authService.getLineAuthenticationPageURL());
    }

    @Get('lineLoginPageAdmin')
    async adminLineLoginPage(@Res() res: Response) {
        res.redirect(this.authService.getAdminLineAuthenticationPageURL());
    }

    @Get('line/callback')
    async lineCallback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('error') error: string,
        @Query('errorCode') errorCode: string,
        @Query('errorMessage') errorMessage: string,
        @Res() res: Response,
    ) {
        if (error != null || errorCode != null || errorMessage != null) {
            throw new UnauthorizedException(errorMessage);
        }
        if (await this.authService.validateState(state)) {
            res.redirect(this.authService.getLiffCallbackWithAccessCode(code));
        } else {
            throw new UnauthorizedException('User not authorize');
        }
    }

    @Get('line/admin/callback')
    async adminLineCallback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('error') error: string,
        @Query('errorCode') errorCode: string,
        @Query('errorMessage') errorMessage: string,
        @Res() res: Response,
    ) {
        if (error != null || errorCode != null || errorMessage != null) {
            throw new UnauthorizedException(errorMessage);
        }
        if (await this.authService.validateState(state)) {
            res.redirect(this.authService.getAdminCallbackWithAccessCode(code));
        } else {
            throw new UnauthorizedException('User not authorize');
        }
    }

    @ApiOperation({
        title: 'Request long token(AUTHENTICATION_ID) from line for user, admin, superuser to complete register',
    })
    @Post('lineToken')
    async lineAuthToken(@Body() body: RequestTokenDto): Promise<LineAccessToken> {
        return this.authService.getAccessToken(body.code);
    }

    @ApiOperation({
        title: 'Request our internal server jwt token for user, admin, superuser (for bearer)',
    })
    @Post('myToken/line')
    async getJwtTokenFromLineToken(@Body() body: LineUserTokenDto): Promise<JwtTokenInfo> {
        return await this.authService.getJwtTokenFromLineToken(body.lineToken);
    }
}
