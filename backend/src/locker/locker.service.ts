import {
    Injectable,
    Inject,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import Locker, { LockerStatus } from '../models/locker.model';
import {
    LockerRepository,
    LockerOwnerRepository,
    LockerStatRepository,
} from '../config';
import LockerOwner from '../models/locker-owner.model';
import LockerStat, { CurrentStatus } from '../models/locker-stat.model';
import { ConfigService } from '../config/config.service';
import { v4 } from 'uuid';

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
    ) {}

    async list(...status: LockerStatus[]): Promise<Locker[]> {
        return await this.lockerRepository.findAll({
            where: {
                status: { $in: status },
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

    async delete(id: number) {
        await this.lockerRepository.destroy({ where: { id } });
    }

    async reserve(userID: number, lockerID: number) {
        const locker = await this.lockerOwnerRepository.findOne({
            where: { lockerID, end: null },
        });
        if (locker) {
            throw new UnauthorizedException('Locker in used');
        } else {
            await this.lockerOwnerRepository.create({
                lockerID,
                userID,
                start: new Date(),
            });
        }
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

    async status(lockerID: number) {
        const locker = this.lockerRepository.findByPk(lockerID, {
            include: [LockerStat],
        });
        return locker;
    }
}
