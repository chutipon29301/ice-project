import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationRepositoryToken } from '../constant';
import { Location } from '../entities/location.entity';
import { LockerAvailability } from '../entities/locker.entity';
import { LockerService } from '../locker/locker.service';

@Injectable()
export class LocationService {

    constructor(
        @Inject(LocationRepositoryToken)
        private readonly locationRepository: Repository<Location>,
        @Inject(forwardRef(() => LockerService))
        private readonly lockerService: LockerService,
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
            locationID?: number,
            lat?: number,
            lng?: number;
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
        if(key.lat&&key.lng){
            
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
        try {
            const location = await this.findLocation({ key: { locationID: id }, joinWith: ['lockers'] });
            await this.lockerService.updateLockerAvailability(location.lockers.map(locker => locker.id), LockerAvailability.MAINTENANCE);
            await this.locationRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    public async findLocationByIDOrFail(id: number): Promise<Location> {
        const location = await this.locationRepository.findOneOrFail(id);
        return location;
    }

}
