import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { sanitize } from 'class-sanitizer';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SanitizerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req: Request, res: Response, next: NextFunction) => {
            sanitize(req.body);
            sanitize(req.params);
            sanitize(req.query);
            next();
        };
    }
}
