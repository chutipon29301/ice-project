import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LineAuthService } from '../line-auth/line-auth.service';
import { LineToken } from 'src/line-auth/dto/line-token.dto';
import { JwtService } from '@nestjs/jwt';
import { State } from 'src/line-auth/dto/state.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
    private readonly lineCallbackURL: string = '/auth/line/callback';
    private readonly passPhase = 'Hello World!';
    constructor(private readonly lineAuthService: LineAuthService,
                private readonly cryptoService: CryptoService,
                private readonly configService: ConfigService) {}

    getLineAuthenticationPageURL(): string {
        return this.lineAuthService.lineAuthPageURL(this.lineCallbackURL);
    }

    async validateState(
        code: string,
        encryptedState: string,
    ): Promise<boolean> {
        const state = State.from(
            this.cryptoService.AES.decrypt(
                decodeURIComponent(encryptedState),
                this.configService.lineChannelSecret,
            ),
        );
        if (!state.compareTo(this.passPhase)) {
            throw new UnauthorizedException(
                'Line authenticate wrong callback state',
            );
        } else {
            return true;
        }
    }

}
