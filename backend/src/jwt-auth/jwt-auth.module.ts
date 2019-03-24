import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { JwtAuthService } from './jwt-auth.service';

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
    providers: [JwtAuthService],
    exports: [JwtAuthService],
})
export class JwtAuthModule {}
