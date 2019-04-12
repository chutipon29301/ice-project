import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationRepositoryToken } from '../constant';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationService {
    constructor(
        @Inject(LocationRepositoryToken)
        private readonly locationRepository: Repository<Location>,
    ) { }

    public async create(description: string, lat: number, lng: number): Promise<Location> {
        const location = new Location(description, lat, lng);
        await this.locationRepository.save(location);
        return location;
    }

    public async findLocation({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            locationID?: number;
        };
        throwError?: boolean;
        joinWith?: Array<keyof Location>;
        nestedJoin?: string[];
    }): Promise<Location> {
        const relations = [...joinWith, ...nestedJoin];
        if (key.locationID) {
            const where: Partial<Location> = { id: key.locationID };
            if (throwError) {
                return await this.locationRepository.findOneOrFail({ where, relations });
            } else {
                return await this.locationRepository.findOne({ where, relations });
            }
        }
        throw new Error('One of the key must be specify');
    }

    public async findLocations(args?: {
        key?: {};
        joinWith?: Array<keyof Location>;
        nestedJoin?: string[];
    }): Promise<Location[]> {
        const {
            joinWith,
            nestedJoin
        } = {
            ...{
                joinWith: [],
                nestedJoin: [],
            },
            ...args
        };
        const relations = [...joinWith, ...nestedJoin];
        return await this.locationRepository.find({ relations });
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
