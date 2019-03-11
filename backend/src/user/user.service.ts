import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { User, Role, AuthenticationType, UserStatus } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: Repository<User>,
    ) { }

    async listUser(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async create(
        nationalID: number,
        firstName: string,
        lastName: string,
        phone: string,
        authenticationID: string
    ): Promise<User> {
        const user = new User(nationalID, firstName, lastName, Role.USER, authenticationID, AuthenticationType.LINE, phone, UserStatus.ACTIVE);
        await this.userRepository.save(user);
        return user;
    }

    async createAdmin(
        nationalID: number,
        firstName: string,
        lastName: string,
        phone: string,
        authenticationID: string,
        authenticationType: AuthenticationType,
    ): Promise<User> {
        const user = new User(nationalID, firstName, lastName, Role.ADMIN, authenticationID, authenticationType, phone, UserStatus.ACTIVE);
        await this.userRepository.save(user);
        return user;
    }
}
