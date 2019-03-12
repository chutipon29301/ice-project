import { Injectable, UnauthorizedException, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LineToken } from './dto/line-token.dto';
import { ConfigService } from '../config/config.service';
import { CryptoService } from '../crypto/crypto.service';
import { State } from './dto/state.dto';
import { LineAccessToken } from './dto/line-access-token.dto';
import { LineAccessTokenRequestResponse } from './dto/line-access-token-request-response.dto';
import { stringify } from 'qs';

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
                accessToken: result.data.access_token,
                refreshToken: result.data.refresh_token,
                expireIn: result.data.expires_in,
                idToken: result.data.id_token,
                state: state.stateString,
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
