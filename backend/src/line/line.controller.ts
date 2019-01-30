import { Controller, Get, Res, Query, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LineService } from './line.service';

@Controller('line')
export class LineController {

    constructor(private readonly lineService: LineService) { }

    @Get()
    async redirect(@Res() res: Response) {
        res.redirect(this.lineService.lineAuthPageURL);
    }

    @Get('callback')
    async callback(
        @Query('code') code: string,
        @Query('state') state: string,
        @Query('error') error: string,
        @Query('errorCode') errorCode: string,
        @Query('errorMessage') errorMessage: string,
        // @Res() res: Response,
    ) {
        if (error != null || errorCode != null || errorMessage != null) {
            throw new UnauthorizedException(errorMessage);
        }
        const token = await this.lineService.getAccessToken(code, state);
        // TODO: Redirect page to frontend
        return token;
    }
}
