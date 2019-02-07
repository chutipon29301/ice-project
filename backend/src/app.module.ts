import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CryptoModule } from './crypto/crypto.module';
import { LineAuthModule } from './line-auth/line-auth.module';
import { LineTokenDecoderModule } from './line-token-decoder/line-token-decoder.module';
import { LineModule } from './line/line.module';
import { LocationModule } from './location/location.module';
import { LockerModule } from './locker/locker.module';
import { AuthHeaderParserMiddleware } from './middleware/auth-header-parser.middleware';
import { SanitizerMiddleware } from './middleware/sanitizer.middleware';
import { RoleModule } from './role/role.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guard/role.guard';
import { GroupModule } from './group/group.module';
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
        RoleModule,
        GroupModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(helmet(), SanitizerMiddleware, AuthHeaderParserMiddleware)
            .forRoutes('*');
    }
}
