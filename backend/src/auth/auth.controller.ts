import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/line')
    public async lineAuth(@Res() res: Response) {
        res.redirect(this.authService.getLineAuthenticationPageURL());
    }
}
