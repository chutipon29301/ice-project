import { Controller, Get, Res, Param, Post, Body, Req } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { BotService } from './bot.service';

const path = require('path');

@Controller('bot')
export class BotController {
  constructor (private readonly service:BotService){}

  @Post('replyline')
  async replyMsg(@Req()req){
    return await this.service.lineBotReplyMsg(req);
  }
  @Get('getPhoto/:fileName')
  async list(@Res() res, @Param('fileName') fileName: string) {
      return await res.sendFile(path.join(__dirname, './', fileName));
  }


}
