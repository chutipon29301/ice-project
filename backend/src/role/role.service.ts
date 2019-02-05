import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { RoleRepository } from '../config';
import Role from '../models/role.model';
import { partialOf } from 'src/util/ObjectMapper';

@Injectable()
export class RoleService {
    constructor(
        @Inject(RoleRepository)
        private readonly roleRepository: typeof Role,
    ) {}
    async list(): Promise<Role[]> {
        return await this.roleRepository.findAll({ raw: true });
    }

    async create(name: string, maxHours: number) {
        try {
            await this.roleRepository.create({ name, maxHours });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async edit(id: number, value: Partial<Role>) {
        await this.roleRepository.update(partialOf<Role>(value), {
            where: { id },
        });
    }

    async delete(id: number) {
        await this.roleRepository.destroy({ where: { id } });
    }
}
