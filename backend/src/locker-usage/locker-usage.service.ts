import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LockerUsageRepositoryToken } from '../constant';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ActionType, LockerUsage } from '../entities/locker-usage.entity';

@Injectable()
export class LockerUsageService {
    constructor(
        @Inject(LockerUsageRepositoryToken)
        private readonly lockerUsageRepository: Repository<LockerUsage>,
    ) {}

    public async create(
        actionType: ActionType,
        lockerInstance: LockerInstance,
    ) {
        const lockerUsage = new LockerUsage(actionType, lockerInstance);
        return await this.lockerUsageRepository.save(lockerUsage);
    }

    public async findLockerUsageByLockerID(
        lockerID: number,
    ): Promise<LockerUsage[]> {
        return await this.lockerUsageRepository.find({
            where: { lockerID },
            order: { timeStamp: 'DESC' },
        });
    }
}
