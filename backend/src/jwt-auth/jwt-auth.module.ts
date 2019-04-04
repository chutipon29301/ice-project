import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { JwtAuthService } from './jwt-auth.service';
import { LineAuthModule } from '../line-auth/line-auth.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.lineChannelSecret,
            }),
        }),
        UserModule,
    ],
    providers: [JwtAuthService, LineAuthModule],
    exports: [JwtAuthService, LineAuthModule],
})
export class JwtAuthModule {}
