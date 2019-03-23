import { Injectable, Inject } from '@nestjs/common';
import { LockerUsage, ActionType } from '../entities/locker-usage.entity';
import { LockerUsageRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { LockerInstance } from '../entities/locker-instance.entity';
@Injectable()
export class LockerUsageService {

    constructor(@Inject(LockerUsageRepositoryToken) private readonly lockerUsageRepository: Repository<LockerUsage>) { }

    public async create(actionType: ActionType, lockerInstance: LockerInstance) {
        const lockerUsage = new LockerUsage(actionType, lockerInstance);
        return await this.lockerUsageRepository.save(lockerUsage);
    }

    public async findLockerUsageByLockerID(lockerID: number): Promise<LockerUsage[]> {
        return await this.lockerUsageRepository.find({ where: { lockerID }, order: { timeStamp: 'DESC' } });
    }
}
