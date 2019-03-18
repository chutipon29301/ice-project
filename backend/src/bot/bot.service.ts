import { Injectable, Component,Param, Res, Body, Req } from '@nestjs/common';
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer TIh2X/GxAUaPoL9diW4QMntF9Eq8ChJAlyTdiI6Ui5FI4OGybgMgP+zKlfN/X1msbBxKF3zMeIdtK9LSHHmh/GLWvn49auTOLDU1+/NF2beWirWE5aR3BohVXDe1bWgq85ifP3lKH1s+MDze90BuAgdB04t89/1O/w1cDnyilFU=`
};
const msg = 'Helloooooo';
const userId ='U40122d9abaa76c9d28ff68db2dca2ce6'; //gain

@Injectable()
export class BotService {
  async lineBotReplyMsg(@Body('req')req){
    if (req.body.events[0].message.type !== 'text') {
      return;
    }
    reply(req.body);
  }
}


const reply = (bodyResponse) => {
  console.info('-----'+ bodyResponse.events[0].source.userId);
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
    ]
    })
  });
};
