import { Module, HttpModule } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { ConfigModule } from '../config/config.module';
import { LineTokenDecoderModule } from '../line-token-decoder/line-token-decoder.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
    imports: [LineTokenDecoderModule, ConfigModule, HttpModule, CryptoModule],
    providers: [LineService],
    controllers: [LineController],
})
export class LineModule {}
