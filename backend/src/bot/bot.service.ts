import { Injectable, Component,Param, Res, Body, Req } from '@nestjs/common';
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer 8bWBukvtuXm8uAUafP4svbC3MzMUEQZT0oZucjWNqle3rRWrzMBMfXe/xZkvEWbkbBxKF3zMeIdtK9LSHHmh/GLWvn49auTOLDU1+/NF2bfDvi4dFljTdjTxFQtYwSMeiWCE5xkqr1PIjbzOuc19fwdB04t89/1O/w1cDnyilFU=`
};

@Injectable()
export class BotService {
  async lineBotReplyMsg(@Body('req')req){
    if (req.body.events[0].type === 'message') {
      reply(req.body);
    }else if (req.body.events[0].type === 'postback') {
      //replyPostback(req.body); //for template button postback
    }else{
      return;
    }
    reply(req.body);
  }
}


const reply = (bodyResponse) => {
  const msg = bodyResponse.events[0].message.text;
  if(msg == 'Help'){
    helpMeMsg(bodyResponse);
  }else if(msg == 'Manual'){
    sendManual(bodyResponse);
  }
  else if(msg == 'Report'){
    askReport(bodyResponse);
  }
  else{
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

const helpMeMsg = (bodyResponse) => {
  const fName = 'helpMe.jpeg';
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        // {
        //   type: "template",
        //   altText: "This is a buttons template",
        //   template: {
        //       type: "buttons",
        //       thumbnailImageUrl: `https://af65e448.ngrok.io/bot/getPhoto/${fName}`,
        //       imageAspectRatio: "rectangle",
        //       imageSize: "cover",
        //       imageBackgroundColor: "#FFFFFF",
        //       title: "Menu",
        //       text: "Helpme",
        //       defaultAction: {
        //           type: "uri",
        //           label: "View detail",
        //           uri: "http://google.com"
        //       },
        //       actions: [
        //           {
        //             type: "postback",
        //             label: "Manual",
        //             data: "wantToRequestmanual"
        //           },
        //           {
        //             type: "postback",
        //             label: "Report",
        //             data: "wantToSendReport"
        //             //uri: "http://google.com"
        //           }
        //       ]
        //   }
        // }
        {
          type: "imagemap",
          baseUrl:`https://af65e448.ngrok.io/bot/getPhoto/${fName}?_ignored=`,
          altText: "This is an imagemap",
          baseSize: {
            width: 1024,
            height: 772
          },
          actions: [
              {
                type: "message",
                label: "manual",
                text: "Manual",
                area: {
                    x: 0,
                    y: 0,
                    width: 1024,
                    height: 386
                }
              },
              {
                type: "message",
                label: "report",
                text: "Report",
                area: {
                    x: 0,
                    y: 386,
                    width: 1024,
                    height: 386
                }
              }
          ]
        }

     ]
    })
  });
}

const sendManual = (bodyResponse) => {
  const fName = 'manual.jpeg';
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: "imagemap",
          baseUrl:`https://af65e448.ngrok.io/bot/getPhoto/${fName}?_ignored=`,
          altText: "This is an imagemap",
          baseSize: {
            width: 1024,
            height: 772
          },
          actions: [
              {
                type: "uri",
                linkUri: "https://google.com/",
                area: {
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 400
                }
              }
          ]
        }

     ]
    })
  });
}
const askReport = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: 'Do you face any problem with our system?'
        }
    ]
    })
  });
};

// const replyPostback = (bodyResponse) => {
//   const msg = bodyResponse.events[0].postback.data;
//   if(msg == 'wantToRequestmanual'){
//     sendManual(bodyResponse);
//   }else if(msg == 'wantToSendReport'){
//    // askReport(bodyResponse);
//   }else{

//   }
// };




