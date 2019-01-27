import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LineToken } from './dto/line-token.dto';

@Injectable()
export class LineTokenDecoderService {
    constructor(private readonly jwtService: JwtService) {}

    decode(token: string): LineToken {
        try {
            const result = this.jwtService.decode(token) as LineToken;
            return result;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
