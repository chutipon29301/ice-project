import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { LockerInstanceRepositoryToken } from '../constant';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ActionType, LockerUsage } from '../entities/locker-usage.entity';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerService } from '../locker/locker.service';
import { UserService } from '../user/user.service';
import { QrService } from '../qr/qr.service';

@Injectable()
export class LockerInstanceService {
    constructor(
        @Inject(LockerInstanceRepositoryToken)
        private readonly lockerInstanceRepository: Repository<LockerInstance>,
        private readonly qrService: QrService,
        @Inject(forwardRef(() => LockerService))
        private readonly lockerService: LockerService,
        private readonly lockerUsageService: LockerUsageService,
        private readonly userService: UserService,
    ) { }

    public async create(
        accessCode: string,
        nationalID: string,
    ): Promise<LockerInstance> {
        const locker = await this.qrService.findLockerByAccessCode(
            accessCode,
        );
        const activeLocker = await this.lockerService.findActiveLockerByID(locker.id);
        const user = await this.userService.getUserWithNationalID(nationalID);
        const inUsedLockerInstance = await this.lockerInstanceRepository.findOne(
            { where: { inUsed: true } },
        );
        if (locker && user && !inUsedLockerInstance) {
            const lockerInstance = new LockerInstance(new Date(), locker, user);
            this.lockerUsageService.create(ActionType.OPEN, lockerInstance);
            return lockerInstance;
        } else {
            throw new NotFoundException('Useable locker not found');
        }
    }

    public async getAllInstance(lockerID: number): Promise<LockerInstance[]> {
        const lockerInstances = await this.lockerInstanceRepository.find({
            where: { lockerId: lockerID },
        });
        return lockerInstances;
    }

    public async findInstance(
        lockerID: number,
        startTime: Date,
    ): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOne({
            where: { lockerID, startTime },
            relations: ['lockerUsages'],
        });
        return lockerInstance;
    }

    public async findInUsedLockerInstanceByLockerID(
        lockerID: number,
    ): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOne({
            where: { lockerID, inUsed: true },
            relations: ['locker', 'ownerUser'],
        });
        console.log(lockerInstance);
        return lockerInstance;
    }

    public async findInUsedLockerInstanceBySerialNumber(
        serialNumber: string,
    ): Promise<LockerInstance> {
        const locker = await this.lockerService.findLockerBySerialNumber(
            serialNumber,
        );
        if (!locker) {
            throw new NotFoundException('Locker not found');
        } else {
            return await this.findInUsedLockerInstanceByLockerID(locker.id);
        }
    }

    public async deleteInstance(lockerID: number, startTime: Date) {
        const lockerInstance = await this.findInstance(lockerID, startTime);
        await this.lockerInstanceRepository.delete(lockerInstance);
    }

    public async unlock(accessCode: string, nationalID: string): Promise<LockerUsage[]> {
        const locker = await this.qrService.findLockerByAccessCode(
            accessCode,
        );
        if (locker) {
            const activeLocker = await this.lockerService.isLockerActiveByLockerID(locker.id);
            if (activeLocker) {
                const lockerInstance = await this.findInUsedLockerInstanceByLockerID(
                    locker.id,
                );
                if (lockerInstance) {
                    this.lockerUsageService.create(ActionType.OPEN, lockerInstance);
                    return lockerInstance.lockerUsages;
                } else {
                    throw new NotFoundException('Locker instance not found');
                }
            } else {
                throw new NotFoundException('Locker not "ACTIVE"');
            }
        }
    }
}
