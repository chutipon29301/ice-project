import { Injectable, Component,Param, Res, Body, Req } from '@nestjs/common';
import { userInfo } from 'os';

const request = require('request-promise');
const path = require('path');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer TIh2X/GxAUaPoL9diW4QMntF9Eq8ChJAlyTdiI6Ui5FI4OGybgMgP+zKlfN/X1msbBxKF3zMeIdtK9LSHHmh/GLWvn49auTOLDU1+/NF2beWirWE5aR3BohVXDe1bWgq85ifP3lKH1s+MDze90BuAgdB04t89/1O/w1cDnyilFU=`
};
const msg = 'Helloooooo';
const userId ='U40122d9abaa76c9d28ff68db2dca2ce6'; //gain

@Injectable()
export class BotService {
  async botSendPhoto(@Res() res, @Param('fileName') fileName: string) {
    return await res.sendFile(path.join(__dirname, './', fileName));
  }

  async lineBotReplyMsg(@Body('req')req){
    if (req.body.events[0].message.type === 'text') {
      reply(req.body);
    }else if (req.body.events[0].message.type === 'text') {
      reply(req.body);
    }

  }
}


const reply = (bodyResponse) => {
  const msg = bodyResponse.events[0].message.text;
  if(msg == 'Help'){
    instructionMsg(bodyResponse);
  }else{
    repeatMsg(bodyResponse);
  }
};

const repeatMsg = (bodyResponse) => {
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


const instructionMsg = (bodyResponse) => {
  const fName = 'instruction.jpeg';
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: "template",
          altText: "This is a buttons template",
          template: {
              type: "buttons",
              thumbnailImageUrl: `https://af65e448.ngrok.io/bot/getPhoto/${fName}`,
              imageAspectRatio: "rectangle",
              imageSize: "cover",
              imageBackgroundColor: "#FFFFFF",
              title: "Menu",
              text: "Please select",
              defaultAction: {
                  type: "uri",
                  label: "View detail",
                  uri: "http://google.com"
              },
              actions: [
                  {
                    type: "postback",
                    label: "Buy",
                    data: "action=buy&itemid=123"
                  },
                  {
                    type: "uri",
                    label: "View detail",
                    uri: "http://google.com"
                  }
              ]
          }
        }
        // {
        //   type: "imagemap",
        //   baseUrl:`https://af65e448.ngrok.io/bot/getPhoto/${fName}`,
        //   altText: "This is an imagemap",
        //   baseSize: {
        //     width: 1024,
        //     height: 772
        //   },
        //   actions: [
        //       {
        //           type: "uri",
        //           linkUri: "https://google.com/",
        //           area: {
        //               x: 0,
        //               y: 386,
        //               width: 1024,
        //               height: 772
        //           }
        //       },
        //       {
        //           type: "message",
        //           text: "Hello",
        //           area: {
        //               x: 0,
        //               y: 386,
        //               width: 1024,
        //               height: 386
        //           }
        //       }
        //   ]
        // }

     ]
    })
  })
  .catch((error) => {
    return Promise.reject(error);
  });
}






