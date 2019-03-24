import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'qs';
import { ConfigService } from '../config/config.service';
import { CryptoService } from '../crypto/crypto.service';
import { LineAccessTokenRequestResponse } from './dto/line-access-token-request-response.dto';
import { LineAccessToken } from './dto/line-access-token.dto';
import { LineToken } from './dto/line-token.dto';
import { State } from './dto/state.dto';

@Injectable()
export class LineAuthService {
    private readonly passPhase = 'Hello World!';

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly cryptoService: CryptoService,
    ) {}

    lineAuthPageURL(redirectURL: string, optionalState: string = ''): string {
        const scope = ['openid', 'profile', 'email'];
        const state = new State(this.passPhase, redirectURL, optionalState);
        return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
            this.configService.lineChannelID
        }&redirect_uri=${encodeURIComponent(
            `${this.configService.serverURL}${redirectURL}`,
        )}&state=${encodeURIComponent(
            this.cryptoService.AES.encrypt(
                state.toString(),
                this.configService.lineChannelSecret,
            ),
        )}&scope=${scope.join('%20')}&bot_prompt=aggressive`;
    }

    async getAccessToken(
        code: string,
        encryptedState: string,
    ): Promise<LineAccessToken> {
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
        }
        const body = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: `${this.configService.serverURL}${
                state.redirectURLString
            }`,
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
                expireIn: result.data.expires_in,
                idToken: result.data.id_token,
            };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    decode(token: string): LineToken {
        try {
            const result = this.jwtService.decode(token) as LineToken;
            return result;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
