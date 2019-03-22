import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { LockerRepositoryToken } from '../constant';
import { Locker, LockerAvailability } from '../entities/locker.entity';
import { RegisterLockerDto } from './dto/register-locker.dto';

@Injectable()
export class LockerService {

    constructor(
        @Inject(LockerRepositoryToken)
        private readonly lockerRepository: Repository<Locker>,
        private readonly configService: ConfigService,
        private readonly locationService: LocationService,
    ) { }

    public async list(): Promise<Locker[]> {
        return await this.lockerRepository.find();
    }

    public async findById(id: number): Promise<Locker> {
        return await this.lockerRepository.findOne(id);
    }

    public async create(secret: string): Promise<Locker> {
        if (this.configService.iotDeviceSecret !== secret) {
            throw new UnauthorizedException('Wrong iot secret');
        }
        try {
            const locker = new Locker();
            await this.lockerRepository.save(locker);
            return locker;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    public async edit(id: number, value: Partial<Locker>) {
        await this.lockerRepository.update(id, value);
    }

    public async registerLocker(id: number, value: RegisterLockerDto) {
        const locker = await this.findLockerByID(id);
        const location = await this.locationService.findLocationByID(value.locationID);
        if (locker.availability === LockerAvailability.UNREGISTERED && location) {
            locker.availability = LockerAvailability.AVAILABLE;
            locker.name = value.name;
            locker.number = value.number;
            locker.location = location;
            await this.lockerRepository.save(locker);
        } else {
            throw new NotFoundException();
        }
    }

    public async delete(id: number) {
        await this.lockerRepository.delete(id);
    }

    public async findLockerByID(id: number): Promise<Locker> {
        const locker = await this.lockerRepository.findOne(id);
        return locker;
    }

    public async findLockerBySerialNumber(serialNumber: string): Promise<Locker> {
        const locker = await this.lockerRepository.findOne({ where: { serialNumber } });
        return locker;
    }
}
