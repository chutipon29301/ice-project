import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { LineAuthModule } from '../line-auth/line-auth.module';
import { LineController } from './line.controller';
import { lineProviders } from './line.providers';
import { LineService } from './line.service';
import { LineTokenDecoderModule } from '../line-token-decoder/line-token-decoder.module';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        DatabaseModule,
        LineAuthModule,
        LineTokenDecoderModule,
        TokenModule,
    ],
    providers: [LineService, ...lineProviders],
    controllers: [LineController],
})
export class LineModule {}
