import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LineTokenDecoderService } from '../line-token-decoder/line-token-decoder.service';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

@Injectable()
export class AuthHeaderParserMiddleware implements NestMiddleware {
    constructor(
        private readonly lineTokenDecoderService: LineTokenDecoderService,
    ) {}

    resolve(...args: any[]): MiddlewareFunction {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = this.lineTokenDecoderService.decode(
                    req.headers.authorization.split(' ')[1],
                );
                req.user = token;
            } catch (error) {
                req.user = null;
            }
            next();
        };
    }
}
