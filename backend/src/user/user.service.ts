import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import {
    User,
    Role,
    AuthenticationType,
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

    async getUserWithLineID(lineID: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                authenticationID: lineID,
                authenticationType: AuthenticationType.LINE,
            },
        });
        return user;
    }

    async getUserWithNationalID(nationalID: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { nationalID },
        });
        return user;
    }

    public async canUserActivateRole(
        nationalID: string,
        ...role: Role[]
    ): Promise<boolean> {
        const user = await this.getUserWithNationalID(nationalID);
        const index = role.indexOf(user.role);
        return index > -1;
    }
}
