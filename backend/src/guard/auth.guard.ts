import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LineAuthService } from '../line-auth/line-auth.service';
import {Request} from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly lineAuthService: LineAuthService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        return request.user != null;
    }
}
