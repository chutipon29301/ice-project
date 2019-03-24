import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from 'src/crypto/crypto.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { LineAuthService } from './line-auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.lineChannelSecret,
                signOptions: {
                    algorithm: 'HS256',
                    audience: configService.lineChannelID,
                    issuer: 'https://access.line.me',
                },
            }),
        }),
        ConfigModule,
        HttpModule,
        CryptoModule,
    ],
    providers: [LineAuthService],
    exports: [LineAuthService],
})
export class LineAuthModule {}
