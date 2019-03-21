import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { sanitize } from 'class-sanitizer';
import { LineUserEventDto } from 'src/bot/dto/line-user-event.dto';

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
