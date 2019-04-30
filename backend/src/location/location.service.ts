import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocationRepositoryToken } from '../constant';
import { Location } from '../entities/location.entity';
import { LockerAvailability } from '../entities/locker.entity';
import { LockerService } from '../locker/locker.service';
import { LocationEmptyLockerCountDto } from './dto/location-empty-locker-count.dto';

@Injectable()
export class LocationService {
    constructor(
        @Inject(LocationRepositoryToken)
        private readonly locationRepository: Repository<Location>,
        @Inject(forwardRef(() => LockerService))
        private readonly lockerService: LockerService,
    ) { }

    public async create(description: string, lat: number, lng: number, imageURL?: string): Promise<Location> {
        const location = new Location(description, lat, lng, imageURL);
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

    public async findLocations({
        key,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {
            sortFrom?: {
                lat: number;
                lng: number;
            };
        };
        joinWith?: Array<keyof Location>;
        nestedJoin?: string[];
    }): Promise<Location[]> {
        const relations = [...joinWith, ...nestedJoin];
        const where: Partial<Location> = {};
        if (key.sortFrom) {
            const { lat, lng } = key.sortFrom;
            const locations = await this.locationRepository.find();
            return await locations.sort((firstLocation, secondLocation) => {
                const firstDist = this.calculateDist(firstLocation.lat, firstLocation.lng, lat, lng);
                const secondDist = this.calculateDist(secondLocation.lat, secondLocation.lng, lat, lng);
                return firstDist - secondDist;
            });
        }
        return await this.locationRepository.find({ where, relations });
    }

    public async findLockerAndCountEmptyLocker(lat?: number, lng?: number): Promise<LocationEmptyLockerCountDto[]> {
        const locations: LocationEmptyLockerCountDto[] = await this.locationRepository.query(`
            SELECT
                location.id,
                location.description,
                location.lat,
                location.lng,
                location.imageURL,
                SUM(instance.inUsed) AS inUsedLocker,
                COUNT(locker.id) AS totalLocker
            FROM
                location
                    LEFT JOIN
                locker ON locker.locationID = location.id
                    LEFT JOIN
                (SELECT
                    *
                FROM
                    locker_instance
                WHERE
                    locker_instance.startTIme >= ALL (SELECT 
                            startTime
                        FROM
                            locker_instance i2
                        WHERE
                            i2.lockerID = locker_instance.lockerID)
                ORDER BY locker_instance.startTime DESC) AS instance ON instance.lockerID = locker.id
            GROUP BY location.id;
        `) as LocationEmptyLockerCountDto[];
        locations.forEach((location) => {
            location.inUsedLocker = location.inUsedLocker || 0;
            location.totalLocker = location.totalLocker || 0;
        });
        return locations.sort((firstLocation, secondLocation) => {
            const firstDist = this.calculateDist(firstLocation.lat, firstLocation.lng, lat, lng);
            const secondDist = this.calculateDist(secondLocation.lat, secondLocation.lng, lat, lng);
            return firstDist - secondDist;
        });
    }

    public async update(id: number, value: Partial<Location>) {
        await this.locationRepository.update(id, value);
    }

    public async delete(id: number) {
        try {
            const location = await this.findLocation({ key: { locationID: id }, joinWith: ['lockers'] });
            if (location.lockers.length > 0) {
                await this.lockerService.updateLockerAvailability(location.lockers.map(locker => locker.id), LockerAvailability.MAINTENANCE);
            }
            await this.locationRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    public async findLocationByIDOrFail(id: number): Promise<Location> {
        const location = await this.locationRepository.findOneOrFail(id);
        return location;
    }

    private calculateDist(destLat: number, destLng: number, lat: number, lng: number): number {
        return Math.sqrt(Math.pow(destLat - lat, 2) + Math.pow(destLng - lng, 2));
    }
}
