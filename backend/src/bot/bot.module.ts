import { Module, HttpModule } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { ConfigModule } from '../config/config.module';
import { LineAuthModule } from 'src/line-auth/line-auth.module';

@Module({
    imports: [ConfigModule, HttpModule, LineAuthModule],
    providers: [BotService],
    controllers: [BotController],
})
export class BotModule {}
