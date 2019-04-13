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

    public async findLockerUsage({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {
            lockerID: number;
        };
        throwError?: boolean;
        joinWith?: Array<keyof LockerUsage>;
        nestedJoin?: string[];
    }): Promise<LockerUsage> {
        const relations = [...joinWith, ...nestedJoin];
        let where: Partial<LockerUsage> = {};
        let order: { [P in keyof LockerUsage]?: 'ASC' | 'DESC' | 1 | -1 } = {};
        if (key.lockerID) {
            where = { lockerID: key.lockerID };
            order = { timeStamp: 'DESC' };
        }
        if (throwError) {
            return await this.lockerUsageRepository.findOneOrFail({ where, relations, order });
        } else {
            return await this.lockerUsageRepository.findOne({ where, relations, order });
        }
    }

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
