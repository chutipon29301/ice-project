import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get pong(): { msg: string } {
    return {
      msg: 'pong',
    };
  }
}
