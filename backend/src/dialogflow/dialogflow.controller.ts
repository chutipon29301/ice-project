import { Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookClient } from 'dialogflow-fulfillment';

// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues

function welcome(agent: any) {
    agent.add(`Welcome to my agent!`);
}

function fallback(agent: any) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

@Controller('dialogflow')
export class DialogflowController {
    @Post('webhook')
    handleWebhook(@Req() request: Request, @Res() response: Response) {
        const agent = new WebhookClient({ request, response });
        // tslint:disable:no-console
        console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
        console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

        const intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        intentMap.set('Default Fallback Intent', fallback);
        // intentMap.set('your intent name here', yourFunctionHandler);
        // intentMap.set('your intent name here', googleAssistantHandler);
        agent.handleRequest(intentMap);
    }
}
