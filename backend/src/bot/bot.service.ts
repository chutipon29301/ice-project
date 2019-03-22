import { HttpService, Injectable } from '@nestjs/common';
import { defaultResponse } from 'src/line-response/default.reponse';
import { manualResponse } from 'src/line-response/manual.response';
import { reportResponse } from 'src/line-response/report.response';
import { ConfigService } from '../config/config.service';
import { helpMeResponse } from '../line-response/help-me.response';
import { LineUserEventDto } from './dto/line-user-event.dto';
import { findLockerResponse } from 'src/line-response/findLocker.response';

@Injectable()
export class BotService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async lineBotReplyMsg(body: LineUserEventDto) {
        const event = body.events[0];
        let msg = '';
        switch (event.type) {
            case 'message':
                msg = event.message.text;
                break;
            case 'postback':
                msg = event.postback.data;
                break;
        }
        let msg = "";
        switch (event.type) {
            case 'message':
                msg = event.message.text;
                break;
            case 'postback':
                msg = event.postback.data;
                break;
        }

        switch (msg) {
            case 'help me':
                await this.reply(event.replyToken, helpMeResponse(this.configService.serverURL));
                break;
            case 'manual':
                await this.reply(event.replyToken, manualResponse(this.configService.serverURL));
                break;
            case 'report':
                await this.reply(event.replyToken, reportResponse);
                break;
            case 'find locker':
                await this.reply(event.replyToken, findLockerResponse);
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
                            Authorization: `Bearer ${
                                this.configService.channelAccessToken
                                }`,
                        },
                    },
                )
                .toPromise();
        } catch (error) {
            console.log(error);
        }
    }
}
