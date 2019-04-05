import {
    Injectable,
    UnauthorizedException,
    HttpException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { UserService } from '../user/user.service';
import { JwtTokenInfo } from './dto/jwt-encrypt-token.dto';
import { JwtToken } from './dto/jwt-token.dto';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async generateTokenForLineID(lineID: string, picture?: string): Promise<JwtTokenInfo> {
        try {
            const user = await this.userService.findUserWithLineIDOrFail(
                lineID,
            );
            if (picture) {
                await this.userService.edit(user.nationalID, { profileImage: picture });
            }
            const payload: JwtToken = {
                nationalID: user.nationalID,
            };
            const expireDate = moment()
                .add('7d')
                .toDate();
            const token = this.jwtService.sign(payload, {
                expiresIn: '7d',
            });
            return {
                expireDate,
                token,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    async decode(token: string): Promise<JwtToken> {
        try {
            const result = this.jwtService.decode(token) as JwtToken;
            return result;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
