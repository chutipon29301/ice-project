import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LockerInstanceRepositoryToken } from '../constant';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ActionType } from '../entities/locker-usage.entity';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerService } from '../locker/locker.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LockerInstanceService {
    constructor(
        @Inject(LockerInstanceRepositoryToken)
        private readonly lockerInstanceRepository: Repository<LockerInstance>,
        @Inject(forwardRef(() => LockerService))
        private readonly lockerService: LockerService,
        private readonly lockerUsageService: LockerUsageService,
        private readonly userService: UserService,
    ) { }

    public async create(
        lockerID: number,
        nationalID: string,
    ): Promise<LockerInstance> {
        const locker = await this.lockerService.findActiveLockerByID(lockerID);
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
        });
        return lockerInstance;
    }

    public async findInUsedLockerInstanceBySerialNumber(
        serialNumber: string,
    ): Promise<LockerInstance> {
        const locker = await this.lockerService.findLockerBySerialNumber(serialNumber);
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

    // public async unlock(lockerID: number, startTime: Date) {
    //     const lockerInstance = await this.findInstance(lockerID, startTime);
    //     const lockerUsage = new LockerUsage(ActionType.OPEN, lockerInstance);
    //     lockerInstance.lockerUsages.push(lockerUsage);
    //     await this.lockerInstanceRepository.save(lockerInstance);
    // }

    // public async lock(locker) {
    //     const lockerInstance = await this.findInstance(lockerID, startTime);
    //     const lockerUsage = new LockerUsage(ActionType.CLOSE, lockerInstance);
    //     lockerInstance.lockerUsages.push(lockerUsage);
    //     await this.lockerInstanceRepository.save(lockerInstance);
    // }
}
