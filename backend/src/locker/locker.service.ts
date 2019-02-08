import {
    Injectable,
    Inject,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import Locker from '../models/locker.model';
import { LockerRepository, LockerOwnerRepository } from '../config';
import LockerOwner from '../models/locker-owner.model';

@Injectable()
export class LockerService {
    constructor(
        @Inject(LockerRepository)
        private readonly lockerRepository: typeof Locker,
        @Inject(LockerOwnerRepository)
        private readonly lockerOwnerRepository: typeof LockerOwner,
    ) {}

    async list(): Promise<Locker[]> {
        return await this.lockerRepository.findAll({ raw: true });
    }

    async create(name: string, locationID: number, lockerNumber: string) {
        try {
            await this.lockerRepository.create({
                name,
                locationID,
                number: lockerNumber,
            });
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
}
