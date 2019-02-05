import { Module, HttpModule } from '@nestjs/common';
import { LineAuthService } from './line-auth.service';
import { ConfigModule } from '../config/config.module';
import { CryptoModule } from '../crypto/crypto.module';
import { LineTokenDecoderModule } from '../line-token-decoder/line-token-decoder.module';

@Module({
    imports: [ConfigModule, HttpModule, CryptoModule, LineTokenDecoderModule],
    providers: [LineAuthService],
    exports: [LineAuthService],
})
export class LineAuthModule {}
