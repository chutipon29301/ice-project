import { Injectable, UnauthorizedException, HttpService } from '@nestjs/common';
import { LineAuthService } from '../line-auth/line-auth.service';
import { State } from '../line-auth/dto/state.dto';
import { CryptoService } from '../crypto/crypto.service';
import { ConfigService } from '../config/config.service';
import { LineAccessToken } from '../line-auth/dto/line-access-token.dto';
import { stringify } from 'querystring';
import { LineAccessTokenRequestResponse } from 'src/line-auth/dto/line-access-token-request-response.dto';

@Injectable()
export class AuthService {
    private readonly lineCallbackURL: string = '/auth/line/callback';
    private readonly passPhase = 'Hello World!';
    constructor(
        private readonly lineAuthService: LineAuthService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

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

    async getAccessToken(code: string): Promise<LineAccessToken> {
        const body = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${this.configService.serverURL}/auth/line/callback`,
            client_id: this.configService.lineChannelID,
            client_secret: this.configService.lineChannelSecret,
        };
        try {
            const result = await this.httpService
                .request<LineAccessTokenRequestResponse>({
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    data: stringify(body),
                    url: 'https://api.line.me/oauth2/v2.1/token',
                })
                .toPromise();
            return {
                accessToken: result.data.access_token,
                refreshToken: result.data.refresh_token,
                expireIn: result.data.expires_in,
                idToken: result.data.id_token,
                state: 'Hello World!',
            };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
