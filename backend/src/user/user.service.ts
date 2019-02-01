import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UsersRepository } from '../config';
import Users from '../models/Users.model';
import { partialOf } from '../util/ObjectMapper';

@Injectable()
export class UserService {
    constructor(
        @Inject(UsersRepository) private readonly usersRepository: typeof Users,
    ) {}

    async create(lineID: string, firstName: string, lastName: string) {
        try {
            await this.usersRepository.create({
                lineID,
                firstName,
                lastName,
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
}
