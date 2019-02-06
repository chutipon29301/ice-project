import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../config';
import Users, { Role } from '../models/users.model';
import { partialOf } from '../util/ObjectMapper';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class UserService {
    private readonly callbackURL = '/user/register/callback';

    constructor(
        @Inject(UsersRepository) private readonly usersRepository: typeof Users,
        private readonly lineAuthService: LineAuthService,
    ) {}

    async create(name: string, oAuthID: string) {
        try {
            await this.usersRepository.create({
                name,
                oAuthID,
            });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async listAll(): Promise<Users[]> {
        const users = await this.usersRepository.findAll({ raw: true });
        return users;
    }

    async edit(id: number, value: Partial<Users>) {
        await this.usersRepository.update(partialOf<Users>(value), {
            where: { id },
        });
    }

    async delete(id: number) {
        await this.usersRepository.destroy({ where: { id } });
    }

    redirectLink(name: string, role: Role): string {
        const state = { name, role };
        return this.lineAuthService.lineAuthPageURL(
            this.callbackURL,
            JSON.stringify(state),
        );
    }

    async register(code: string, state: string) {
        const token = await this.lineAuthService.getAccessToken(code, state);
        const registerState = JSON.parse(token.state) as {
            name: string;
            role: Role;
        };
        const decodeToken = await this.lineAuthService.decode(token.idToken);
        const user = await this.usersRepository.getUserFromLineID(
            decodeToken.sub,
        );
        if (!user) {
            await this.usersRepository.create({
                oAuthID: decodeToken.sub,
                name: registerState.name,
                role: registerState.role,
            });
        } else {
            throw new ConflictException('User already registered');
        }
    }
}
