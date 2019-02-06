import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/config';
import Users from '../models/Users.model';
import { Token } from './dto/token.dto';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(UsersRepository) private readonly usersRepository: typeof Users,
    ) {}

    async generateTokenFor(userID: number): Promise<string> {
        if (await this.usersRepository.checkExistUsersID(userID)) {
            return this.jwtService.sign({
                userID,
            });
        } else {
            throw new UnauthorizedException(
                'User has not been registered in database',
            );
        }
    }

    async decode(token: string): Promise<Token> {
        try {
            const result = this.jwtService.decode(token) as Token;
            return result;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
