import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LockerInstanceRepositoryToken } from 'src/constant';
import { Repository } from 'typeorm';
import { LockerInstance } from 'src/entities/locker-instance.entity';
import { LockerService } from 'src/locker/locker.service';

@Injectable()
export class LockerInstanceService {

    constructor(
        @Inject(LockerInstanceRepositoryToken) private readonly lockerInstanceRepository: Repository<LockerInstance>,
        private readonly lockerService: LockerService,
    ) { }

    public async create(lockerID: number): Promise<LockerInstance> {
        const locker = await this.lockerService.findById(lockerID);
        if (locker) {
            const lockerInstance = new LockerInstance(new Date(), locker);
            await this.lockerInstanceRepository.save(lockerInstance);
            return lockerInstance;
        } else {
            throw new NotFoundException('Locker not found');
        }
    }
}
