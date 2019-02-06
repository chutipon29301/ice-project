import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Token } from '../token/dto/token.dto';

declare global {
    namespace Express {
        interface Request {
            user?: Token;
        }
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        return request.user != null;
    }
}
