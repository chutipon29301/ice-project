import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException, HttpException, ConflictException } from '@nestjs/common';
import { Repository, ObjectLiteral, FindOneOptions } from 'typeorm';
import { LockerInstanceRepositoryToken, CanAccessRelationRepositoryToken } from '../constant';
import { CanAccessRelation } from '../entities/can-access.entity';
import { LockerInstance } from '../entities/locker-instance.entity';
import { LockerUsage } from '../entities/locker-usage.entity';
import { LockerUsageService } from '../locker-usage/locker-usage.service';
import { LockerService } from '../locker/locker.service';
import { QrService } from '../qr/qr.service';
import { UserService } from '../user/user.service';
import { CreditUsageService } from '../credit-usage/credit-usage.service';

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
    ) { }

    public async create(accessCode: string, nationalID: string): Promise<LockerInstance> {
        try {
            const qrCode = await this.qrService.findQRCode({ key: { accessCode } });
            const activeLocker = await this.lockerService.findLocker({ key: { activeLockerID: qrCode.lockerID } });
            const user = await this.userService.findUser({ key: { nationalID } });
            const currentLockerInstance = await this.findInstance({
                key: { inUsedLockerID: activeLocker.id },
                throwError: false,
            });
            if (currentLockerInstance) {
                throw new ConflictException('Locker is in used');
            }
            let lockerInstance = new LockerInstance(activeLocker, user);
            await this.lockerInstanceRepository.save(lockerInstance);
            lockerInstance = await this.findInstance({ key: { inUsedLockerID: activeLocker.id } });
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

    public async findInstance({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            instance?: {
                lockerID: number;
                startTime: Date;
            };
            inUsedLockerID?: number;
            accessCode?: string;
            ownerOf?: {
                lockerID: number;
                ownerID: string;
            }
        };
        throwError?: boolean;
        joinWith?: Array<keyof LockerInstance>;
        nestedJoin?: string[];
    }): Promise<LockerInstance> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<LockerInstance> = {};
        try {
            if (key.instance) {
                where = { lockerID: key.instance.lockerID, startTime: key.instance.startTime };
            }
            if (key.inUsedLockerID) {
                where = { lockerID: key.inUsedLockerID, inUsed: true };
            }
            if (key.accessCode) {
                const qrCode = await this.qrService.findQRCode({ key: { accessCode: key.accessCode } });
                where = { lockerID: qrCode.lockerID, inUsed: true };
            }
            if (key.ownerOf) {
                where = { lockerID: key.ownerOf.lockerID, inUsed: true, userID: key.ownerOf.ownerID };
            }
            if (throwError) {
                return await this.lockerInstanceRepository.findOneOrFail({ where, relations });
            } else {
                return await this.lockerInstanceRepository.findOne({ where, relations });
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }

    public async findInstances({
        key,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {
            inUsed?: boolean;
            inUsedByNationalID?: string;
            accessibleLockerByNationalID?: string;
        };
        joinWith?: Array<keyof LockerInstance>;
        nestedJoin?: string[];
    }): Promise<LockerInstance[]> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<LockerInstance> = {};
        if (key.inUsed) {
            where = { inUsed: key.inUsed };
        }
        if (key.inUsedByNationalID) {
            where = { userID: key.inUsedByNationalID, inUsed: true };
        }
        return await this.lockerInstanceRepository.find({ where, relations });
    }

    public async findCanAccessRelation({
        key,
        throwError = true,
        joinWith = [],
        nestedJoin = [],
    }: {
        key: {
            relation?: {
                startTime: string;
                lockerID: number;
                nationalID: string;
            };
        };
        throwError?: boolean;
        joinWith?: Array<keyof CanAccessRelation>;
        nestedJoin?: string[];
    }): Promise<CanAccessRelation> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        let where: Partial<CanAccessRelation> | { startTime: string } = {}
        if (key.relation) {
            where = {
                startTime: key.relation.startTime,
                lockerID: key.relation.lockerID,
                nationalID: key.relation.nationalID,
            };
        }
        if (throwError) {
            return await this.canAccessRelationRepository.findOneOrFail({ where, relations });
        } else {
            return await this.canAccessRelationRepository.findOne({ where, relations });
        }
    }

    public async findCanAccessRelations({
        key,
        joinWith = [],
        nestedJoin = [],
    }: {
        key?: {
            nationalID?: string;
        };
        joinWith?: Array<keyof CanAccessRelation>;
        nestedJoin?: string[];
    }): Promise<CanAccessRelation[]> {
        const relations: string[] = [...joinWith, ...nestedJoin];
        if (key.nationalID) {
            const canAccessRelations = await this.canAccessRelationRepository.find({
                where: { nationalID: key.nationalID, },
                relations,
            });
            return canAccessRelations.filter(
                canAccessRelation =>
                    canAccessRelation.accessibleLockerInstance.inUsed && canAccessRelation.accessibleLockerInstance.userID !== key.nationalID,
            );
        }
        return await this.canAccessRelationRepository.find({ relations });
    }

    public async deleteInstance(lockerID: number, startTime: Date) {
        try {
            const lockerInstance = await this.findInstance({
                key: { instance: { lockerID, startTime } },
            });
            await this.lockerInstanceRepository.delete(lockerInstance);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    public async addPermissionFromNationalIDAndLockerID(nationalID: string, lockerID: number) {
        try {
            const user = await this.userService.findUser({ key: { nationalID } });
            const lockerInstance = await this.findInstance({ key: { inUsedLockerID: lockerID } });
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

    public async revokePermissionFromNationalIDAndLockerID(ownerNationalID: string, nationalID: string, lockerID: number) {
        try {
            const lockerInstance = await this.findInstance({
                key: { inUsedLockerID: lockerID },
                joinWith: ['canAccesses'],
            });
            if (lockerInstance.userID !== ownerNationalID) {
                throw new UnauthorizedException('Not owner of locker');
            }
            const index = lockerInstance.canAccesses.findIndex((canAccess) => canAccess.nationalID === nationalID);
            if (index === -1) {
                throw new NotFoundException(`User with nationalID "${nationalID}" does not have permission to access`);
            }
            lockerInstance.canAccesses.splice(index, 1);
            this.lockerInstanceRepository.save(lockerInstance);
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
            const qrCode = await this.qrService.findQRCode({ key: { accessCode } });
            const activeLocker = await this.lockerService.isLockerActiveByLockerID(qrCode.lockerID);
            if (!activeLocker) {
                throw new NotFoundException('Not found "ACTIVE" Locker');
            }
            const lockerInstance = await this.findInstance({ key: { inUsedLockerID: qrCode.lockerID } });
            const canAccessRelation = await this.findCanAccessRelation({
                key: {
                    relation: {
                        startTime: lockerInstance.startTime.toISOString(),
                        lockerID: lockerInstance.lockerID,
                        nationalID,
                    },
                },
                throwError: false,
            });
            const user = await this.userService.findUser({ key: { nationalID } });
            if (canAccessRelation) {
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
            const qrCode = await this.qrService.findQRCode({ key: { accessCode } });
            const lockerInstance = await this.findInstance({ key: { inUsedLockerID: qrCode.lockerID } });
            if (lockerInstance.userID !== nationalID) {
                throw new UnauthorizedException('Not owner of in used locker instance');
            }
            lockerInstance.endTime = new Date();
            lockerInstance.inUsed = false;
            await this.lockerInstanceRepository.save(lockerInstance);
            await this.creditUsageService.deductCreditByTime(lockerInstance.startTime, lockerInstance.endTime, nationalID);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new NotFoundException(error.message);
            }
        }
    }
    public async lockerIsInUsed(accessCode: string): Promise<boolean> {
        const qrCode = await this.qrService.findQRCode({ key: { accessCode } });
        const activeLocker = await this.lockerService.findLocker({ key: { activeLockerID: qrCode.lockerID } });
        const currentLockerInstance = await this.findInstance({
            key: { inUsedLockerID: activeLocker.id },
            throwError: false,
        });
        return currentLockerInstance.inUsed;
    }
}

