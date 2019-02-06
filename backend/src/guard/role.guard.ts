import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import Users, { Role } from '../models/users.model';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RoleService } from '../role/role.service';

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
        return this.roleService.canUserActivateRole(user.userID, ...roles);
    }
}
