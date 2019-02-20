import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './dto/jwt-token.dto';

@Injectable()
export class JwtAuthService {

    constructor(private readonly jwtService: JwtService) { }
    // async generateTokenFor(userID: number): Promise<string> {
    //     if (await this.usersRepository.checkExistUsersID(userID)) {
    //         return this.jwtService.sign({
    //             userID,
    //         });
    //     } else {
    //         throw new UnauthorizedException(
    //             'User has not been registered in database',
    //         );
    //     }
    // }
    async decode(token: string): Promise<JwtToken> {
        try {
            const result = this.jwtService.decode(token) as JwtToken;
            return result;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
