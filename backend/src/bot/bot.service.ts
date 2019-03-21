import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { helpMeResponse } from '../line-response/help-me.response';
import { LineUserEventDto } from './dto/line-user-event.dto';
import { manualResponse } from 'src/line-response/manual.response';
import { reportResponse } from 'src/line-response/report.response';
import { defaultResponse } from 'src/line-response/default.reponse';

@Injectable()
export class BotService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async lineBotReplyMsg(body: LineUserEventDto) {

        const event = body.events[0];
        let msg = "";
        switch(event.type){
          case 'message':
            msg = event.message.text;
            break;
          case 'postback':
            msg = event.postback.data;
            break;
        }
        console.log(msg);
        switch (msg) {
            case 'help':
                await this.reply(event.replyToken, helpMeResponse);
                break;
            case 'manual':
                await this.reply(event.replyToken, manualResponse);
                break;
            case 'report':
                await this.reply(event.replyToken, reportResponse);
                break;
            default:
                await this.reply(event.replyToken, defaultResponse);
                break;
        }
    }

    private async reply(replyToken: string, messages: any) {
        try {
            await this.httpService
                .post(
                    `${this.configService.lineMessagingApiEndpoint}/reply`,
                    {
                        replyToken: replyToken,
                        messages: messages,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.configService.channelAccessToken}`,
                        },
                    },
                )
                .toPromise();
        } catch (error) {
            console.log(error);
        }
    }
}
