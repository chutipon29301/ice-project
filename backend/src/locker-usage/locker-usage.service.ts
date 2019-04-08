import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LockerUsageRepositoryToken } from '../constant';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ActionType, LockerUsage } from '../entities/locker-usage.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class LockerUsageService {
    constructor(
        @Inject(LockerUsageRepositoryToken)
        private readonly lockerUsageRepository: Repository<LockerUsage>,
    ) {}

    public async lock(lockerInstance: LockerInstance): Promise<LockerUsage> {
        const lockerUsage = new LockerUsage(ActionType.CLOSE, lockerInstance);
        return await this.lockerUsageRepository.save(lockerUsage);
    }

    public async unlock(lockerInstance: LockerInstance, user: User): Promise<LockerUsage> {
        const lockerUsage = new LockerUsage(ActionType.OPEN, lockerInstance);
        lockerUsage.user = user;
        return await this.lockerUsageRepository.save(lockerUsage);
    }

    public async findLockerUsageByLockerID(lockerID: number): Promise<LockerUsage[]> {
        return await this.lockerUsageRepository.find({
            where: { lockerID },
            order: { timeStamp: 'DESC' },
        });
    }
}
