import { Injectable, Inject, ConflictException } from '@nestjs/common';
import Location from '../models/location.model';
import { LocationRepository } from 'src/config';

@Injectable()
export class LocationService {
    constructor(
        @Inject(LocationRepository)
        private readonly locationRepository: typeof Location,
    ) {}

    async list(): Promise<Location[]> {
        return await this.locationRepository.findAll({ raw: true });
    }

    async create(name: string, detail: string) {
        try {
            await this.locationRepository.create({ name, detail });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async edit(id: number, value: Partial<Location>) {
        await this.locationRepository.update(value, {
            where: { id },
        });
    }

    async delete(id: number) {
        await this.locationRepository.destroy({ where: { id } });
    }
}
