import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { User, Role, AuthenticationType, UserStatus } from '../entities/user.entity';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepositoryToken) private readonly userRepository: Repository<User>,
        private readonly lineAuthService: LineAuthService,
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
        authenticationID: string,
    ): Promise<User> {
        authenticationID = this.lineAuthService.decode(authenticationID).sub
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
