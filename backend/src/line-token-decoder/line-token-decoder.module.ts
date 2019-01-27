import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LineTokenDecoderService } from './line-token-decoder.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

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
    ],
    providers: [LineTokenDecoderService],
    exports: [LineTokenDecoderService],
})
export class LineTokenDecoderModule {}
