import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtToken } from 'src/jwt-auth/dto/jwt-token.dto';
import { Role } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

declare global {
    namespace Express {
        interface Request {
            user?: JwtToken;
        }
    }
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as Request;
        const user = request.user;
        if (!user) {
            return false;
        }
        return this.userService.canUserActivateRole(user.nationalID, ...roles);
    }
}
