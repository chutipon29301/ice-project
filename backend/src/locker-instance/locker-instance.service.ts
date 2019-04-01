import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
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
            const locker = await this.qrService.findLockerByAccessCode(
                accessCode,
            );
            if (!locker) {
                throw new NotFoundException('Locker not found');
            }
            const activeLocker = await this.lockerService.findActiveLockerByID(
                locker.id,
            );
            if (!activeLocker) {
                throw new NotFoundException('Active locker not found');
            }
            const user = await this.userService.findUserWithNationalIDOrFail(
                nationalID,
            );
            const inUsedLockerInstance = await this.lockerInstanceRepository.findOne(
                { where: { inUsed: true } },
            );
            if (inUsedLockerInstance) {
                throw new NotFoundException('Locker is inuse');
            }
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
        }
        return await this.findInUsedLockerInstanceByLockerID(locker.id);
    }

    public async findLockerInstancesByNationalID(
        nationalID: string,
    ): Promise<LockerInstance[]> {
        const user = this.userService.getUserWithNationalID(nationalID);
        if (!user) {
            throw new UnauthorizedException(
                'User has not been register with the system',
            );
        }
        const lockerInstances = this.lockerInstanceRepository.find({
            where: { userID: nationalID, inUsed: true },
        });
        return lockerInstances;
    }

    public async deleteInstance(lockerID: number, startTime: Date) {
        const lockerInstance = await this.findInstance(lockerID, startTime);
        await this.lockerInstanceRepository.delete(lockerInstance);
    }

    public async addPermissionFromNationalIDAndLockerID(
        nationalID: string,
        lockerID: number,
    ) {
        const user = await this.userService.findUserWithNationalIDOrFail(nationalID);
        const lockerInstance = await this.findInUsedLockerInstanceByLockerID(lockerID);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!lockerInstance) {
            throw new NotFoundException('Locker instance not found');
        }
        const canAccessRelation = new CanAccessRelation(user, lockerInstance);
        await this.canAccessRelationRepository.save(canAccessRelation);
    }

    public async unlock(
        accessCode: string,
        nationalID: string,
    ): Promise<LockerUsage[]> {
        const locker = await this.qrService.findLockerByAccessCode(accessCode);
        if (!locker) {
            throw new NotFoundException('Locker not found');
        }
        const activeLocker = await this.lockerService.isLockerActiveByLockerID(
            locker.id,
        );
        if (!activeLocker) {
            throw new NotFoundException('Not found "ACTIVE" Locker');
        }
        const lockerInstance = await this.findInUsedLockerInstanceByLockerID(
            locker.id,
        );
        if (!lockerInstance) {
            throw new NotFoundException('Locker instance not found');
        }
        this.lockerUsageService.create(ActionType.OPEN, lockerInstance);
        return lockerInstance.lockerUsages;
    }
}
