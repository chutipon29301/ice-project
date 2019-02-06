import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from '../models/users.model';
import { RoleService } from '../role/role.service';
import { Token } from '../token/dto/token.dto';

declare global {
    namespace Express {
        interface Request {
            user?: Token;
        }
    }
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly roleService: RoleService,
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
        return this.roleService.canUserActivateRole(user.userID, ...roles);
    }
}
