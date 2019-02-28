import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LineAuthModule } from './line-auth/line-auth.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { SanitizerMiddleware } from './middleware/sanitizer.middleware';
import { LockerModule } from './locker/locker.module';
import * as helmet from 'helmet';

@Module({
    imports: [
        ConfigModule,
        LineAuthModule,
        CryptoModule,
        AuthModule,
        JwtAuthModule,
        UserModule,
        LocationModule,
        LockerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(helmet(), SanitizerMiddleware).forRoutes('*');
    }
}
