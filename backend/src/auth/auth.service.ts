import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { stringify } from 'qs';
import { LineAccessTokenRequestResponse } from 'src/line-auth/dto/line-access-token-request-response.dto';
import { ConfigService } from '../config/config.service';
import { CryptoService } from '../crypto/crypto.service';
import { JwtTokenInfo } from '../jwt-auth/dto/jwt-encrypt-token.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { LineAccessToken } from '../line-auth/dto/line-access-token.dto';
import { State } from '../line-auth/dto/state.dto';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class AuthService {
    private readonly lineCallbackURL: string = '/auth/line/callback';
    private readonly passPhase = 'Hello World!';

    constructor(
        private readonly lineAuthService: LineAuthService,
        private readonly jwtAuthService: JwtAuthService,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    public getLineAuthenticationPageURL(): string {
        return this.lineAuthService.lineAuthPageURL(this.lineCallbackURL);
    }

    public getLiffCallbackWithAccessCode(accessCode: string): string {
        return `${
            this.configService.liffServerURL
        }/auth/line-landing=${accessCode}`;
    }

    public async validateState(encryptedState: string): Promise<boolean> {
        const state = State.from(
            this.cryptoService.AES.decrypt(
                decodeURIComponent(encryptedState),
                this.configService.lineChannelSecret,
            ),
        );
        if (state.compareTo(this.passPhase)) {
            return true;
        } else {
            throw new UnauthorizedException(
                'Line authenticate wrong callback state',
            );
        }
    }

    public async getAccessToken(code: string): Promise<LineAccessToken> {
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
                expireIn: result.data.expires_in,
                idToken: result.data.id_token,
            };
        } catch (error) {
            throw new UnauthorizedException(error.response.data);
        }
    }

    public async getJwtTokenFromLineToken(
        lineToken: string,
    ): Promise<JwtTokenInfo> {
        const decodedLineToken = this.lineAuthService.decode(lineToken);
        if (decodedLineToken) {
            return this.jwtAuthService.generateTokenForLineID(
                decodedLineToken.sub,
                decodedLineToken.picture
            );
        } else {
            throw new UnauthorizedException('Invalid line token');
        }
    }
}
