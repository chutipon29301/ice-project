import { HttpModule, Module } from '@nestjs/common';
import { LineAuthModule } from 'src/line-auth/line-auth.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
    imports: [HttpModule, LineAuthModule],
    providers: [BotService],
    controllers: [BotController],
})
export class BotModule {}
