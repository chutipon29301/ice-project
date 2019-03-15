import { Controller, Get, Res, Param } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
const path = require('path');
@Controller('bot')
export class BotController {

  @Get(':fileName')
  async list(@Res() res, @Param('fileName') fileName: string) {
      return await res.sendFile(path.join(__dirname, './', fileName));

  }
}
