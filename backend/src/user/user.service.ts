import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryToken } from '../constant';
import {
    AuthenticationType,
    Role,
    User,
    UserStatus,
} from '../entities/user.entity';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: Repository<User>,
        private readonly lineAuthService: LineAuthService,
    ) {}

    async listUser(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async create(
        nationalID: string,
        firstName: string,
        lastName: string,
        phone: string,
        authenticationID: string,
    ): Promise<User> {
        authenticationID = this.lineAuthService.decode(authenticationID).sub;
        const user = new User(
            nationalID,
            firstName,
            lastName,
            Role.USER,
            authenticationID,
            AuthenticationType.LINE,
            phone,
            UserStatus.ACTIVE,
        );
        await this.userRepository.save(user);
        return user;
    }

    async createAdmin(
        nationalID: string,
        firstName: string,
        lastName: string,
        phone: string,
        authenticationID: string,
        authenticationType: AuthenticationType,
    ): Promise<User> {
        const user = new User(
            nationalID,
            firstName,
            lastName,
            Role.ADMIN,
            authenticationID,
            authenticationType,
            phone,
            UserStatus.ACTIVE,
        );
        await this.userRepository.save(user);
        return user;
    }

    public async findUserWithLineIDOrFail(lineID: string): Promise<User> {
        const user = await this.userRepository.findOneOrFail({
            where: {
                authenticationID: lineID,
                authenticationType: AuthenticationType.LINE,
            },
        });
        return user;
    }

    async findUserWithNationalIDOrFail(nationalID: string): Promise<User> {
        const user = await this.userRepository.findOneOrFail({
            where: { nationalID },
        });
        return user;
    }

    async canUserActivateRole(
        nationalID: string,
        ...roles: Role[]
    ): Promise<boolean> {
        try {
            const user = await this.findUserWithNationalIDOrFail(nationalID);
            return roles.indexOf(user.role) !== -1;
        } catch (_) {
            return false;
        }
    }
}
