import { Module } from '@nestjs/common';
import { LineTokenDecoderService } from './line-token-decoder.service';

@Module({
    providers: [LineTokenDecoderService],
})
export class LineTokenDecoderModule {}
