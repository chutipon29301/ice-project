import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ApiUseTags } from '@nestjs/swagger';
import { BotService } from './bot.service';
import { LineUserEventDto } from './dto/line-user-event.dto';

@ApiUseTags('Bot')
@Controller('bot')
export class BotController {
    constructor(private readonly botService: BotService) {}

    @Post('replyline')
    async replyMsg(@Body() body: LineUserEventDto) {
        this.botService.lineBotReplyMsg(body);
    }

    @Get('replyImage/:fName')
    async getFile(@Res() response: Response, @Param('fName') fName: string) {
        await response.sendFile(join(__dirname, './', fName));
    }
}
