import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LineTokenDecoderService } from '../line-token-decoder/line-token-decoder.service';
import { CryptoService } from '../crypto/crypto.service';
import { State } from './dto/state.dto';

@Injectable()
export class LineService {
    private readonly passPhase = 'Hello World!';

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly lineTokenDecoderService: LineTokenDecoderService,
        private readonly cryptoService: CryptoService,
    ) {}

    get lineAuthPageURL(): string {
        const scope = ['openid', 'profile', 'email'];
        const state = new State(this.passPhase);
        return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
            this.configService.lineChannelID
        }&redirect_uri=${encodeURIComponent(
            this.configService.serverURL,
        )}&state=${this.cryptoService.AES.encrypt(
            state,
            this.configService.lineChannelSecret,
        )}&scope=${scope.join('%20')}`;
    }
}
