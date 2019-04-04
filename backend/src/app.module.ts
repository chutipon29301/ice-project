import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from './config/config.module';
import { CryptoModule } from './crypto/crypto.module';
import { GroupModule } from './group/group.module';
import { RoleGuard } from './guard/role.guard';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { LineAuthModule } from './line-auth/line-auth.module';
import { LocationModule } from './location/location.module';
import { LockerInstanceModule } from './locker-instance/locker-instance.module';
import { LockerUsageModule } from './locker-usage/locker-usage.module';
import { LockerModule } from './locker/locker.module';
import { AuthHeaderParserMiddleware } from './middleware/auth-header-parser.middleware';
import { SanitizerMiddleware } from './middleware/sanitizer.middleware';
import { QrModule } from './qr/qr.module';
import { UserModule } from './user/user.module';
import { ShareLockerModule } from './share-locker/share-locker.module';
import { GlobalModule } from './global/global.module';
import { CreditUsageModule } from './credit-usage/credit-usage.module';
import * as helmet from 'helmet';

@Module({
    imports: [
        GlobalModule,
        LineAuthModule,
        CryptoModule,
        AuthModule,
        JwtAuthModule,
        UserModule,
        LocationModule,
        LockerModule,
        LockerInstanceModule,
        LockerUsageModule,
        GroupModule,
        BotModule,
        QrModule,
        ShareLockerModule,
        CreditUsageModule,
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
