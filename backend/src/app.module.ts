import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { LockerModule } from './locker/locker.module';
import { LocationModule } from './location/location.module';
import { LineModule } from './line/line.module';
import { LineTokenDecoderModule } from './line-token-decoder/line-token-decoder.module';
import { CryptoModule } from './crypto/crypto.module';
import { SanitizerMiddleware } from './middleware/sanitizer.middleware';
import { LineAuthModule } from './line-auth/line-auth.module';
import { AuthHeaderParserMiddleware } from './middleware/auth-header-parser.middleware';
import { TokenModule } from './token/token.module';
import * as helmet from 'helmet';

@Module({
    imports: [
        ConfigModule,
        UserModule,
        LockerModule,
        LocationModule,
        LineModule,
        LineTokenDecoderModule,
        CryptoModule,
        LineAuthModule,
        TokenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(helmet(), SanitizerMiddleware, AuthHeaderParserMiddleware)
            .forRoutes('*');
    }
}
