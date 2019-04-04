import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationRepositoryToken } from '../constant';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationService {
    constructor(
        @Inject(LocationRepositoryToken)
        private readonly locationRepository: Repository<Location>,
    ) {}

    public async create(
        description: string,
        lat: number,
        lng: number,
    ): Promise<Location> {
        const location = new Location(description, lat, lng);
        await this.locationRepository.save(location);
        return location;
    }

    public async list(): Promise<Location[]> {
        return await this.locationRepository.find({});
    }

    public async update(id: number, value: Partial<Location>) {
        await this.locationRepository.update(id, value);
    }

    public async delete(id: number) {
        await this.locationRepository.delete(id);
    }

    public async findLocationByIDOrFail(id: number): Promise<Location> {
        const location = await this.locationRepository.findOneOrFail(id);
        return location;
    }
}
