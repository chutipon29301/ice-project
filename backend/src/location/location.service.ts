import { Injectable, Inject, ConflictException } from '@nestjs/common';
import Location from '../models/Location.model';
import { LocationRepository } from 'src/config';

@Injectable()
export class LocationService {
    constructor(
        @Inject(LocationRepository)
        private readonly locationRepo: typeof Location,
    ) {}

    async list(): Promise<Location[]> {
        return await this.locationRepo.findAll({ raw: true });
    }

    async create(name: string, detail: string) {
        try {
            await this.locationRepo.create({ name, detail });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async edit(id: number, value: Partial<Location>) {
        await this.locationRepo.update(value, {
            where: { id },
        });
    }

    async delete(id: number) {
        await this.locationRepo.destroy({ where: { id } });
    }
}
