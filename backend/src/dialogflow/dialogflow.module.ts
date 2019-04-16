import { Module } from '@nestjs/common';
import { DialogflowController } from './dialogflow.controller';
import { DialogflowService } from './dialogflow.service';

@Module({
    controllers: [DialogflowController],
    providers: [DialogflowService],
})
export class DialogflowModule {}
