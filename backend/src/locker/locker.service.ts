import { Injectable, Inject, ConflictException } from '@nestjs/common';
import Locker from '../models/Locker.model';
import { LockerRepository } from '../config';

@Injectable()
export class LockerService {
    constructor(
        @Inject(LockerRepository)
        private readonly lockerRepository: typeof Locker,
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
}
