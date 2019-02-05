import { Injectable } from '@nestjs/common';
import { LineAccessToken } from '../line-auth/dto/line-access-token.dto';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class LineService {
    private redirectURL: string = '/line/callback';

    constructor(private readonly lineAuthService: LineAuthService) {}

    get lineAuthPageURL(): string {
        return this.lineAuthService.lineAuthPageURL(this.redirectURL);
    }

    async getAccessToken(
        code: string,
        encryptedState: string,
    ): Promise<LineAccessToken> {
        return await this.lineAuthService.getAccessToken(code, encryptedState);
    }
}
