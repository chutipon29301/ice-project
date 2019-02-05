import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly lineAuthService: LineAuthService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return true;
    }
}
