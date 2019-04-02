import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    HttpException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import {
    LockerInstanceRepositoryToken,
    CanAccessRelationRepositoryToken,
} from '../constant';
import { CanAccessRelation } from '../entities/can-access.entity';
import { LockerInstance } from '../entities/locker-instance.entity';
import { ActionType, LockerUsage } from '../entities/locker-usage.entity';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerService } from '../locker/locker.service';
import { QrService } from '../qr/qr.service';
import { UserService } from '../user/user.service';

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
        @Inject(CanAccessRelationRepositoryToken)
        private readonly canAccessRelationRepository: Repository<
            CanAccessRelation
        >,
    ) { }

    public async create(
        accessCode: string,
        nationalID: string,
    ): Promise<LockerInstance> {
        try {
            const locker = await this.qrService.findLockerByAccessCodeOrFail(accessCode);
            const activeLocker = await this.lockerService.findActiveLockerByIDOrFail(locker.id);
            const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
            await this.lockerInstanceRepository.findOneOrFail({ where: { inUsed: true } });
            let lockerInstance = new LockerInstance(activeLocker, user);
            lockerInstance = await this.lockerInstanceRepository.save(
                lockerInstance,
            );
            const canAccessRelation = new CanAccessRelation(
                user,
                lockerInstance,
            );
            await this.canAccessRelationRepository.save(canAccessRelation);
            return lockerInstance;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    public async findAllInstance(lockerID: number): Promise<LockerInstance[]> {
        const lockerInstances = await this.lockerInstanceRepository.find({
            where: { lockerId: lockerID },
        });
        return lockerInstances;
    }

    public async findInstanceOrFail(
        lockerID: number,
        startTime: Date,
    ): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOneOrFail({
            where: { lockerID, startTime },
            relations: ['lockerUsages'],
        });
        return lockerInstance;
    }

    public async findInUsedLockerInstanceByLockerIDOrFail(
        lockerID: number,
    ): Promise<LockerInstance> {
        const lockerInstance = await this.lockerInstanceRepository.findOneOrFail({
            where: { lockerID, inUsed: true },
            relations: ['locker', 'ownerUser'],
        });
        return lockerInstance;
    }

    public async findLockerInstancesByNationalID(
        nationalID: string,
    ): Promise<LockerInstance[]> {
        try {
            await this.userService.findUserWithNationalIDOrFail(nationalID);
            const lockerInstances = await this.lockerInstanceRepository.find({
                where: { userID: nationalID, inUsed: true },
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

    public async deleteInstance(lockerID: number, startTime: Date) {
        try {
            const lockerInstance = await this.findInstanceOrFail(lockerID, startTime);
            await this.lockerInstanceRepository.delete(lockerInstance);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    public async addPermissionFromNationalIDAndLockerID(
        nationalID: string,
        lockerID: number,
    ) {
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

    public async unlock(
        accessCode: string,
        nationalID: string,
    ): Promise<LockerUsage[]> {
        try {
            const locker = await this.qrService.findLockerByAccessCodeOrFail(accessCode);
            if (!locker) {
                throw new NotFoundException('Locker not found');
            }
            const activeLocker = await this.lockerService.isLockerActiveByLockerID(
                locker.id,
            );
            if (!activeLocker) {
                throw new NotFoundException('Not found "ACTIVE" Locker');
            }
            const lockerInstance = await this.findInUsedLockerInstanceByLockerIDOrFail(locker.id);
            this.lockerUsageService.create(ActionType.OPEN, lockerInstance);
            return lockerInstance.lockerUsages;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
}
