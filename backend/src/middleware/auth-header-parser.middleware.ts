import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Token } from '../token/dto/token.dto';
import { TokenService } from '../token/token.service';

declare global {
    namespace Express {
        interface Request {
            user?: Token;
        }
    }
}

@Injectable()
export class AuthHeaderParserMiddleware implements NestMiddleware {
    constructor(private readonly tokenService: TokenService) {}

    resolve(...args: any[]): MiddlewareFunction {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                this.tokenService
                    .decode(req.headers.authorization.split(' ')[1])
                    .then(token => {
                        req.user = token;
                        next();
                    })
                    .catch(error => {
                        req.user = null;
                        next();
                    });
            } catch (error) {
                req.user = null;
                next();
            }
        };
    }
}
