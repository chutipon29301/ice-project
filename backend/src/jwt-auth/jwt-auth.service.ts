import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthService {
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
    // async decode(token: string): Promise<Token> {
    //     try {
    //         const result = this.jwtService.decode(token) as Token;
    //         return result;
    //     } catch (error) {
    //         throw new UnauthorizedException(error);
    //     }
    // }
}
