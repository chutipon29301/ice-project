import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../config';
import Users, { Role } from '../models/users.model';

@Injectable()
export class RoleService {

    constructor(
        @Inject(UsersRepository) private readonly userRepository: typeof Users,
    ) { }

    async canUserActivateRole(userID: number, ...role: Role[]): Promise<boolean> {
        return await this.userRepository.canActivate(userID, ...role);
    }
}
