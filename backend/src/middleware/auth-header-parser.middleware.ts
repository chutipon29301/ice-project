import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtToken } from 'src/jwt-auth/dto/jwt-token.dto';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';

declare global {
    namespace Express {
        interface Request {
            user?: JwtToken;
        }
    }
}

@Injectable()
export class AuthHeaderParserMiddleware implements NestMiddleware {
    constructor(private readonly jwtAuthService: JwtAuthService) {}

    resolve(...args: any[]): MiddlewareFunction {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                this.jwtAuthService
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
