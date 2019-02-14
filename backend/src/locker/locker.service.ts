import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import UserPermission from '../models/user-permission.model';
import { v4 } from 'uuid';
import {
    LockerOwnerRepository,
    LockerRepository,
    LockerStatRepository,
    UsersRepository,
} from '../config';
import { ConfigService } from '../config/config.service';
import LockerOwner from '../models/locker-owner.model';
import LockerStat, { CurrentStatus } from '../models/locker-stat.model';
import Locker, { LockerStatus } from '../models/locker.model';
import Users from '../models/users.model';
import { LockerStatusResponseDto } from './dto/locker-status-response.dto';
import { EditRegisterLockerDto } from './dto/edit-register-locker-dto';

@Injectable()
export class LockerService {
    constructor(
        private readonly configService: ConfigService,
        @Inject(LockerRepository)
        private readonly lockerRepository: typeof Locker,
        @Inject(LockerOwnerRepository)
        private readonly lockerOwnerRepository: typeof LockerOwner,
        @Inject(LockerStatRepository)
        private readonly lockerStatRepository: typeof LockerStat,
        @Inject(UsersRepository)
        private readonly usersRepository: typeof Users,
    ) {}

    async list(...status: LockerStatus[]): Promise<Locker[]> {
        return await this.lockerRepository.findAll({
            where: {
                status: { $in: status || Object.keys(LockerStatus)  },
            },
            raw: true,
        });
    }

    async create(secret: string): Promise<Locker> {
        if (this.configService.iotDeviceSecret !== secret) {
            throw new UnauthorizedException('Wrong secret');
        }
        try {
            const uuid = v4();
            return await this.lockerRepository.create({ serial: uuid });
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async edit(id: number, value: Partial<Locker>) {
        await this.lockerRepository.update(value, {
            where: { id },
        });
    }

    async editRegisterLocker(
        id: number,
        body: EditRegisterLockerDto,
        userID: number,
    ) {
        try {
            await this.edit(id, { ...body, status: LockerStatus.AVAILABLE });
        } catch (error) {
            throw new NotFoundException(error);
        }
        await this.lockerStatRepository.create({
            status: CurrentStatus.LOCK,
            userID,
            lockerID: id,
        });
    }

    async delete(id: number) {
        await this.lockerRepository.destroy({ where: { id } });
    }

    async reserve(userID: number, lockerID: number) {
        if (await this.lockerRepository.isLockerAvailable(lockerID)) {
            throw new UnauthorizedException('Locker is not available');
        }
        const locker = await this.lockerOwnerRepository.findOne({
            attributes: ['id'],
            where: { lockerID, end: null },
        });
        if (locker) {
            throw new UnauthorizedException('Locker in used');
        }
        await this.lockerOwnerRepository.create({
            lockerID,
            userID,
            start: new Date(),
        });
    }

    async checkout(userID: number, lockerOwnerID: number) {
        const lockerOwner = await this.lockerOwnerRepository.findByPk(
            lockerOwnerID,
        );
        if (lockerOwner.userID !== userID) {
            throw new UnauthorizedException('Not owner of the locker');
        } else {
            lockerOwner.end = new Date();
            await lockerOwner.save();
        }
    }

    async status(lockerID: number): Promise<LockerStatusResponseDto> {
        const locker = await this.lockerRepository.find({
            attributes: ['id', 'name', 'number'],
            where: { id: lockerID },
            include: [
                {
                    attributes: ['status'],
                    model: LockerStat,
                    as: 'lockerStatus',
                    required: false,
                },
            ],
            order: [['lockerStatus', 'createdAt', 'DESC']],
        });
        const lockerCurrentStatus = locker.lockerStatus[0];
        return {
            id: locker.id,
            name: locker.name,
            number: locker.number,
            lockerStatus: lockerCurrentStatus.status,
        };
    }

    async triggerLock(lockerID: number, userID: number, status: CurrentStatus) {
        const user = await this.usersRepository.findByPk(userID, {
            include: [
                {
                    model: LockerOwner,
                    as: 'owns',
                    include: [
                        {
                            model: Locker,
                        },
                    ],
                    where: { end: null },
                    required: false,
                },
                {
                    model: UserPermission,
                    as: 'permission',
                    include: [
                        {
                            model: LockerOwner,
                            include: [Locker],
                            where: { end: null },
                        },
                    ],
                    required: false,
                },
            ],
        });
        let isAuthorize: boolean = false;
        user.owns.forEach(locker => {
            if (locker.lockerID === lockerID) {
                isAuthorize = true;
            }
        });
        user.permission
            .map(permission => permission.lockerOwner)
            .forEach(o => {
                if (o.lockerID === lockerID) {
                    isAuthorize = true;
                }
            });
        if (isAuthorize) {
            this.lockerStatRepository.create({
                status,
                userID,
                lockerID,
            });
        } else {
            throw new UnauthorizedException(
                'User is not owner or is not given access to the locker',
            );
        }
    }
}
