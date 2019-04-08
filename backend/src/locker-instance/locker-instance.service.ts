import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LockerInstanceRepositoryToken, CanAccessRelationRepositoryToken } from '../constant';
import { CanAccessRelation } from '../entities/can-access.entity';
import { LockerInstance } from '../entities/locker-instance.entity';
import { LockerUsage } from '../entities/locker-usage.entity';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerService } from '../locker/locker.service';
import { QrService } from '../qr/qr.service';
import { UserService } from '../user/user.service';
import { CreditUsageService } from 'src/credit-usage/credit-usage.service';

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
        private readonly creditUsageService: CreditUsageService,
        @Inject(CanAccessRelationRepositoryToken)
        private readonly canAccessRelationRepository: Repository<CanAccessRelation>,
    ) {}

    public async create(accessCode: string, nationalID: string): Promise<LockerInstance> {
        try {
            const locker = await this.qrService.findLockerByAccessCodeOrFail(accessCode);
            const activeLocker = await this.lockerService.findActiveLockerByIDOrFail(locker.id);
            const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
            await this.lockerInstanceRepository.findOneOrFail({
                where: { inUsed: true },
            });
            let lockerInstance = new LockerInstance(activeLocker, user);
            lockerInstance = await this.lockerInstanceRepository.save(lockerInstance);
            const canAccessRelation = new CanAccessRelation(user, lockerInstance);
            await this.canAccessRelationRepository.save(canAccessRelation);
            return lockerInstance;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async findInstanceOrFail(lockerID: number, startTime: Date): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOneOrFail({
            where: { lockerID, startTime },
            relations: ['lockerUsages'],
        });
        return lockerInstance;
    }

    public async findInUsedLockerInstanceByLockerIDOrFail(lockerID: number): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOneOrFail({
            where: { lockerID, inUsed: true },
            relations: ['locker', 'ownerUser'],
        });
        return lockerInstance;
    }

    public async findInUsedLockerInstance(): Promise<LockerInstance[]> {
        const lockerInstances = await this.lockerInstanceRepository.find({
            where: { inUsed: true },
        });
        return lockerInstances;
    }

    public async findInUsedLockerInstanceByNationalID(nationalID: string): Promise<LockerInstance[]> {
        try {
            await this.userService.findUserWithNationalIDOrFail(nationalID);
            const lockerInstances = await this.lockerInstanceRepository.find({
                where: {
                    userID: nationalID,
                    inUsed: true,
                },
                relations: ['locker', 'locker.location', 'ownerUser'],
            });
            return lockerInstances;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async findCanAccessLockerByNationalID(nationalID: string): Promise<LockerInstance[]> {
        try {
            await this.userService.findUserWithNationalIDOrFail(nationalID);
            const canAccessLockerInstances = await this.canAccessRelationRepository.find({
                where: {
                    nationalID,
                    accessibleLockerInstance: {
                        inUsed: true,
                    },
                },
                relations: [
                    'accessibleLockerInstance',
                    'accessibleLockerInstance.locker',
                    'accessibleLockerInstance.locker.location',
                    'accessibleLockerInstance.ownerUser',
                ],
            });
            return canAccessLockerInstances.map(canAccessRelation => canAccessRelation.accessibleLockerInstance);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async deleteInstance(lockerID: number, startTime: Date) {
        try {
            const lockerInstance = await this.findInstanceOrFail(lockerID, startTime);
            await this.lockerInstanceRepository.delete(lockerInstance);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    public async addPermissionFromNationalIDAndLockerID(nationalID: string, lockerID: number) {
        try {
            const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
            const lockerInstance = await this.findInUsedLockerInstanceByLockerIDOrFail(lockerID);
            const canAccessRelation = new CanAccessRelation(user, lockerInstance);
            await this.canAccessRelationRepository.save(canAccessRelation);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async unlock(nationalID: string, accessCode: string): Promise<LockerUsage> {
        try {
            const locker = await this.qrService.findLockerByAccessCodeOrFail(accessCode);
            const activeLocker = await this.lockerService.isLockerActiveByLockerID(locker.id);
            if (!activeLocker) {
                throw new NotFoundException('Not found "ACTIVE" Locker');
            }
            const lockerInstance = await this.findInUsedLockerInstanceByLockerIDOrFail(locker.id);
            const canAccessUser = await this.canAccessRelationRepository.findOne({
                startTime: lockerInstance.startTime.toISOString(),
                lockerID: lockerInstance.lockerID,
                nationalID,
            });
            const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
            if (canAccessUser) {
                return await this.lockerUsageService.unlock(lockerInstance, user);
            } else {
                throw new UnauthorizedException('User is not allowed to access this locker');
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async returnInstance(nationalID: string, accessCode: string) {
        try {
            const locker = await this.qrService.findLockerByAccessCodeOrFail(accessCode);
            const lockerInstance = await this.findInUsedLockerInstanceByLockerIDOrFail(locker.id);
            if (lockerInstance.userID !== nationalID) {
                throw new UnauthorizedException('Not owner of in used locker instance');
            }
            lockerInstance.endTime = new Date();
            lockerInstance.inUsed = false;
            await this.lockerInstanceRepository.save(lockerInstance);
            this.creditUsageService.calculateTimeCharge(lockerInstance.startTime, lockerInstance.endTime, nationalID);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
}
