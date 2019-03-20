import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ToDate } from 'class-sanitizer';
import { ToDateFromTimestamp } from './sanitizer';

class PongSanitizedDTO {
    @ToDate()
    date: Date;

    @ToDateFromTimestamp()
    dateFromTimestamp: Date;
}

// tslint:disable-next-line:max-classes-per-file
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/ping')
    getPong(): { msg: string } {
        return this.appService.pong;
    }

    @Post('/ping-sanitized')
    getPongSanitized(@Body() body: PongSanitizedDTO): { msg: string } {
        // tslint:disable-next-line:no-console
        console.log(body);
        return this.appService.pong;
    }
}
