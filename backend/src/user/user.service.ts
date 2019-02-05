import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../config';
import Users from '../models/users.model';
import { partialOf } from '../util/ObjectMapper';
import { LineAuthService } from '../line-auth/line-auth.service';

@Injectable()
export class UserService {
    private readonly callbackURL = '/user/register/callback';

    constructor(
        @Inject(UsersRepository) private readonly usersRepository: typeof Users,
        private readonly lineAuthService: LineAuthService,
    ) {}

    async create(roleID: number, name: string, oAuthID: string) {
        try {
            await this.usersRepository.create({
                roleID,
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

    get redirectLink(): string {
        return this.lineAuthService.lineAuthPageURL(this.callbackURL);
    }

    async register(code: string, state: string) {
        const token = await this.lineAuthService.getAccessToken(code, state);
        return await this.lineAuthService.decode(token.idToken);
        // TODO: Add user to database
    }
}
