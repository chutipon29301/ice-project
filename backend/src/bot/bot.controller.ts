import { Controller, Post, Req, Body, Get, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { LineUserEventDto } from './dto/line-user-event.dto';
import { BotService } from './bot.service';
import { join } from 'path';

@Controller('bot')
export class BotController {
    constructor(private readonly botService: BotService) {}

    @Post('replyline')
    async replyMsg(@Body() body: LineUserEventDto) {
        this.botService.lineBotReplyMsg(body);

    }

    @Get('replyImage/:fName')
    async getFile(@Res() response: Response, @Param('fName')fName: string) {
        await response.sendFile(join(__dirname, './', fName));
    }
}
