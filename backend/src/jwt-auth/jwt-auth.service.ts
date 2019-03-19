import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './dto/jwt-token.dto';
import { UserService } from '../user/user.service';
import { JwtTokenInfo } from './dto/jwt-encrypt-token.dto';
import * as moment from 'moment';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async generateTokenForLineID(lineID: string): Promise<JwtTokenInfo> {
        const user = await this.userService.getUserWithLineID(lineID);
        if (user) {
            const payload: JwtToken = {
                userID: user.nationalID,
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
        } else {
            throw new UnauthorizedException(
                'User has not been registered in database',
            );
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
