import { Controller, Get, Res, Query, UnauthorizedException, Post } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
        if (await this.authService.validateState(code, state)) {
            return code;
        }
    }
}
