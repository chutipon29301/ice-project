import { Module, HttpModule } from '@nestjs/common';
import { LineAuthService } from './line-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CryptoModule } from 'src/crypto/crypto.module';

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
