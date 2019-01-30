import { Injectable, HttpService, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LineTokenDecoderService } from '../line-token-decoder/line-token-decoder.service';
import { CryptoService } from '../crypto/crypto.service';
import { State } from './dto/state.dto';
import { LineAccessToken } from './dto/line-access-token.dto';
import { LineAccessTokenRequestResponse } from './dto/line-access-token-request-response.dto';
import { stringify } from 'qs';

@Injectable()
export class LineService {
    private readonly passPhase = 'Hello World!';
    private redirectURL: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly lineTokenDecoderService: LineTokenDecoderService,
        private readonly cryptoService: CryptoService,
    ) {
        this.redirectURL = configService.serverURL + '/line/callback';
    }

    get lineAuthPageURL(): string {
        const scope = ['openid', 'profile', 'email'];
        const state = new State(this.passPhase);
        return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
            this.configService.lineChannelID
            }&redirect_uri=${encodeURIComponent(
                this.redirectURL,
            )}&state=${this.cryptoService.AES.encrypt(
                state.toString(),
                this.configService.lineChannelSecret,
            )}&scope=${scope.join('%20')}`;
    }

    async getAccessToken(code: string, encryptedState: string): Promise<LineAccessToken> {
        const state = State.from(this.cryptoService.AES.decrypt(encryptedState, this.configService.lineChannelSecret));
        if (!state.compareTo(this.passPhase)) {
            throw new UnauthorizedException('Line authenticate wrong callback state');
        }
        const body = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.redirectURL,
            client_id: this.configService.lineChannelID,
            client_secret: this.configService.lineChannelSecret,
        };
        try {
            const result = await this.httpService.request<LineAccessTokenRequestResponse>({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: stringify(body),
                url: 'https://api.line.me/oauth2/v2.1/token',
            }).toPromise();
            return {
                accessToken: result.data.access_token,
                refreshToken: result.data.refresh_token,
                expireIn: result.data.expires_in,
                idToken: result.data.id_token,
            };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
