import {
    Controller,
    Get,
    Res,
    Query,
    UnauthorizedException,
    Post,
    Body,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LineUserTokenDto } from './dto/line-user-token.dto';
import { JwtTokenInfo } from '../jwt-auth/dto/jwt-encrypt-token.dto';
import { RequestTokenDto } from './dto/request-token.dto';
import { LineAccessToken } from 'src/line-auth/dto/line-access-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('line')
    public async lineAuth(@Res() res: Response) {
        res.redirect(this.authService.getLineAuthenticationPageURL());
    }

    @Get('line/callback')
    async lineCallback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('error') error: string,
        @Query('errorCode') errorCode: string,
        @Query('errorMessage') errorMessage: string,
        // @Res() res: Response,
    ): Promise<string> {
        if (error != null || errorCode != null || errorMessage != null) {
            throw new UnauthorizedException(errorMessage);
        }
        if (await this.authService.validateState(state)) {
            return code;
        }
    }

    @Post('lineAuthToken')
    async lineAuthToken(
        @Body() body: RequestTokenDto,
    ): Promise<LineAccessToken> {
        return this.authService.getAccessToken(body.code);
    }

    @Post('token/line')
    async getJwtTokenFromLineToken(
        @Body() body: LineUserTokenDto,
    ): Promise<JwtTokenInfo> {
        return await this.authService.getJwtTokenFromLineToken(body.lineToken);
    }
}
