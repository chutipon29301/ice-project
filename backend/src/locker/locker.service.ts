import { Injectable, Inject } from '@nestjs/common';
import { LockerRepositoryToken } from 'src/constant';
import { Repository } from 'typeorm';
import { Locker } from 'src/entities/locker.entity';

@Injectable()
export class LockerService {
    constructor(
        @Inject(LockerRepositoryToken)
        private readonly lockerRepository: Repository<Locker>,
    ) {}

    public async list(): Promise<Locker[]> {
        return await this.lockerRepository.find();
    }
}
