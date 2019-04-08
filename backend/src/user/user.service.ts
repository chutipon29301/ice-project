import { Inject, Injectable, HttpException, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryToken } from '../constant';
import { AuthenticationType, Role, User, UserStatus } from '../entities/user.entity';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepositoryToken)
        private readonly userRepository: Repository<User>,
        private readonly lineAuthService: LineAuthService,
    ) {}

    public async listUser(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    public async create(nationalID: string, firstName: string, lastName: string, phone: string, authenticationID: string): Promise<User> {
        const existingUser = await this.findUserWithNationalID(nationalID);
        if (existingUser) {
            throw new ConflictException('User is already registered to the system');
        }
        const lineToken = this.lineAuthService.decode(authenticationID);
        const user = new User(nationalID, firstName, lastName, Role.USER, lineToken.sub, AuthenticationType.LINE, phone, UserStatus.ACTIVE);
        user.profileImage = lineToken.picture;
        await this.userRepository.save(user);
        return user;
    }

    public async createAdmin(nationalID: string, firstName: string, lastName: string, phone: string, authenticationID: string): Promise<User> {
        const existingUser = await this.findUserWithNationalID(nationalID);
        if (existingUser) {
            throw new ConflictException('User is already registered to the system');
        }
        const lineToken = this.lineAuthService.decode(authenticationID);
        const user = new User(nationalID, firstName, lastName, Role.ADMIN, lineToken.sub, AuthenticationType.LINE, phone, UserStatus.ACTIVE);
        user.profileImage = lineToken.picture;
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

    public async findUserWithNationalIDOrFail(nationalID: string): Promise<User> {
        const user = await this.userRepository.findOneOrFail({
            where: { nationalID },
        });
        return user;
    }

    public async findUserWithNationalID(nationalID: string): Promise<User> {
        const user = await this.userRepository.findOne(nationalID);
        return user;
    }

    public async canUserActivateRole(nationalID: string, ...roles: Role[]): Promise<boolean> {
        try {
            const user = await this.findUserWithNationalIDOrFail(nationalID);
            return roles.indexOf(user.role) !== -1;
        } catch (_) {
            return false;
        }
    }

    public async edit(nationalID: string, updateValue: Partial<User>): Promise<User> {
        try {
            const user = await this.findUserWithNationalIDOrFail(nationalID);
            await this.userRepository.update(nationalID, updateValue);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
}
