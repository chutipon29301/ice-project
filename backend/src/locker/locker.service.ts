import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { LockerRepositoryToken } from '../constant';
import { ActionType } from '../entities/locker-usage.entity';
import { Locker, LockerAvailability } from '../entities/locker.entity';
import { LockerInstanceService } from '../locker-instance/locker-instance.service';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerCurrentStatusResponseDto } from './dto/locker-current-status-response.dto';
import { RegisterLockerDto } from './dto/register-locker.dto';

@Injectable()
export class LockerService {
    constructor(
        @Inject(LockerRepositoryToken)
        private readonly lockerRepository: Repository<Locker>,
        private readonly configService: ConfigService,
        private readonly locationService: LocationService,
        private readonly lockerUsageService: LockerUsageService,
        @Inject(forwardRef(() => LockerInstanceService))
        private readonly lockerInstanceService: LockerInstanceService,
    ) { }

    public async list(): Promise<Locker[]> {
        return await this.lockerRepository.find();
    }

    public async findLockerByID(id: number): Promise<Locker> {
        const locker = await this.lockerRepository.findOne(id);
        return locker;
    }

    public async findLockerBySerialNumber(
        serialNumber: string,
    ): Promise<Locker> {
        const locker = await this.lockerRepository.findOne({
            where: { serialNumber },
        });
        return locker;
    }

    public async findActiveLockerByID(id: number): Promise<Locker | null> {
        return await this.lockerRepository.findOne({
            where: { id, availability: LockerAvailability.AVAILABLE },
        });
    }

    public async findActiveLockerBySerialNumber(
        serialNumber: string,
    ): Promise<Locker | null> {
        return await this.lockerRepository.findOne({
            where: { serialNumber, availability: LockerAvailability.AVAILABLE },
        });
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

    public async registerLocker(id: number, value: RegisterLockerDto) {
        const locker = await this.findLockerByID(id);
        const location = await this.locationService.findLocationByID(
            value.locationID,
        );
        if (
            locker.availability === LockerAvailability.UNREGISTERED && location
        ) {
            locker.availability = LockerAvailability.AVAILABLE;
            locker.name = value.name;
            locker.number = value.number;
            locker.location = location;
            await this.lockerRepository.save(locker);
        } else {
            throw new NotFoundException();
        }
    }

    public async edit(id: number, value: Partial<Locker>) {
        await this.lockerRepository.update(id, value);
    }

    public async delete(id: number) {
        await this.lockerRepository.delete(id);
    }

    public async getLockerCurrentStatus(
        serialNumber: string,
    ): Promise<LockerCurrentStatusResponseDto> {
        const locker = await this.findActiveLockerBySerialNumber(serialNumber);
        if (!locker) {
            throw new NotFoundException('Locker not found');
        }
        const lockerUsages = await this.lockerUsageService.findLockerUsageByLockerID(
            locker.id,
        );
        if (lockerUsages.length !== 0) {
            return {
                isOpen: lockerUsages[0].actionType === ActionType.OPEN,
                lockerNumber: locker.number,
            };
        } else {
            return {
                isOpen: false,
                lockerNumber: locker.number,
            };
        }
    }

    public async lock(
        serialNumber: string,
    ): Promise<LockerCurrentStatusResponseDto> {
        const locker = await this.findLockerBySerialNumber(serialNumber);
        if (!locker) {
            throw new NotFoundException('Locker not found');
        }
        const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerID(
            locker.id,
        );
        if (!lockerInstance) {
            throw new NotFoundException('Locker not found');
        }
        await this.lockerUsageService.create(ActionType.CLOSE, lockerInstance);
        return await this.getLockerCurrentStatus(serialNumber);
    }

    public async isLockerActiveByLockerID(lockerID: number): Promise<boolean> {
        const locker = await this.findLockerByID(lockerID);
        if (locker) {
            return locker.availability === LockerAvailability.AVAILABLE;
        } else {
            throw new NotFoundException('Locker not found');
        }
    }
}
