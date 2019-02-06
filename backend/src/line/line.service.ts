import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as moment from 'moment';
import { UsersRepository } from '../config';
import { LineAuthService } from '../line-auth/line-auth.service';
import { LineTokenDecoderService } from '../line-token-decoder/line-token-decoder.service';
import Users from '../models/users.model';
import { TokenObject } from '../token/dto/token-object.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class LineService {
    private redirectURL: string = '/line/callback';

    constructor(
        private readonly lineAuthService: LineAuthService,
        private readonly lineTokenDecoderService: LineTokenDecoderService,
        private readonly tokenService: TokenService,
        @Inject(UsersRepository) private readonly usersRepository: typeof Users,
    ) {}

    get lineAuthPageURL(): string {
        return this.lineAuthService.lineAuthPageURL(this.redirectURL);
    }

    async getAccessToken(
        code: string,
        encryptedState: string,
    ): Promise<TokenObject> {
        const token = await this.lineAuthService.getAccessToken(
            code,
            encryptedState,
        );
        const decodedToken = this.lineTokenDecoderService.decode(token.idToken);
        const user = await this.usersRepository.getUserFromLineID(
            decodedToken.sub,
        );
        if (user) {
            return {
                token: await this.tokenService.generateTokenFor(user.id),
                expireDate: moment()
                    .add(1, 'week')
                    .toDate(),
            };
        } else {
            throw new UnauthorizedException(
                `User is not yet registered to the system`,
            );
        }
    }
}
