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
    ) { }

    public async listUser(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    public async create(nationalID: string, firstName: string, lastName: string, phone: string, authenticationID: string): Promise<User> {
        const existingUser = await this.findUser({ key: { nationalID }, throwError: false });
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
        const existingUser = await this.findUser({ key: { nationalID }, throwError: false });
        if (existingUser) {
            throw new ConflictException('User is already registered to the system');
        }
        const lineToken = this.lineAuthService.decode(authenticationID);
        const user = new User(nationalID, firstName, lastName, Role.ADMIN, lineToken.sub, AuthenticationType.LINE, phone, UserStatus.ACTIVE);
        user.profileImage = lineToken.picture;
        await this.userRepository.save(user);
        return user;
    }

    public async findUser({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            lineID?: string;
            nationalID?: string;
        };
        throwError?: boolean;
        joinWith?: Array<keyof User>;
        nestedJoin?: string[];
    }): Promise<User> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<User> = {};
        if (key.lineID) {
          where = { authenticationID: key.lineID, authenticationType: AuthenticationType.LINE };
        }
        if (key.nationalID) {
            where = { nationalID: key.nationalID };
        }
        if (throwError) {
            return await this.userRepository.findOneOrFail({ where, relations });
        } else {
            return await this.userRepository.findOne({ where, relations });
        }
        throw new Error('One of the key must be specify');
    }

    public async canUserActivateRole(nationalID: string, ...roles: Role[]): Promise<boolean> {
        try {
            const user = await this.findUser({ key: { nationalID } });
            return roles.indexOf(user.role) !== -1;
        } catch (_) {
            return false;
        }
    }

    public async edit(nationalID: string, updateValue: Partial<User>): Promise<User> {
        try {
            const user = await this.findUser({ key: { nationalID } });
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
