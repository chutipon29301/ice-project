import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    HttpException,
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

    public async findLockerByIDOrFail(id: number): Promise<Locker> {
        const locker = await this.lockerRepository.findOneOrFail(id);
        return locker;
    }

    public async findLockerBySerialNumberOrFail(
        serialNumber: string,
    ): Promise<Locker> {
        const locker = await this.lockerRepository.findOneOrFail({
            where: { serialNumber },
        });
        return locker;
    }

    public async findActiveLockerByIDOrFail(
        id: number,
    ): Promise<Locker | null> {
        return await this.lockerRepository.findOneOrFail({
            where: { id, availability: LockerAvailability.AVAILABLE },
        });
    }

    public async findActiveLockerBySerialNumberOrFail(
        serialNumber: string,
    ): Promise<Locker | null> {
        return await this.lockerRepository.findOneOrFail({
            where: { serialNumber, availability: LockerAvailability.AVAILABLE },
        });
    }

    public async findLockerInstanceHistoryByLockerID(lockerID: number): Promise<Locker> {
        try {
            const locker = await this.lockerRepository.findOneOrFail(lockerID, {
                relations: ['lockerInstances', 'lockerInstances.ownerUser'],
            });
            return locker;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
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
        try {
            const locker = await this.findLockerByIDOrFail(id);
            const location = await this.locationService.findLocationByIDOrFail(
                value.locationID,
            );
            if (locker.availability !== LockerAvailability.UNREGISTERED) {
                throw new ConflictException(
                    'Locker has already been registered',
                );
            }
            locker.availability = LockerAvailability.AVAILABLE;
            locker.name = value.name;
            locker.number = value.number;
            locker.location = location;
            await this.lockerRepository.save(locker);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
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
        try {
            const locker = await this.findLockerBySerialNumberOrFail(
                serialNumber,
            );
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
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async lock(
        serialNumber: string,
    ): Promise<LockerCurrentStatusResponseDto> {
        try {
            const locker = await this.findLockerBySerialNumberOrFail(
                serialNumber,
            );
            const lockerInstance = await this.lockerInstanceService.findInUsedLockerInstanceByLockerIDOrFail(
                locker.id,
            );
            await this.lockerUsageService.lock(lockerInstance);
            return await this.getLockerCurrentStatus(serialNumber);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async isLockerActiveByLockerID(lockerID: number): Promise<boolean> {
        try {
            const locker = await this.findLockerByIDOrFail(lockerID);
            return locker.availability === LockerAvailability.AVAILABLE;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
