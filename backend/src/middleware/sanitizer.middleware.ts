import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { sanitize } from 'class-sanitizer';

@Injectable()
export class SanitizerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return async (req: Request, res: Response, next: NextFunction) => {
            sanitize(req.body);
            await next();
        };
    }
}
