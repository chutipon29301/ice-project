import {
    Injectable,
    Inject,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { LockerRepositoryToken } from '../constant';
import { Repository } from 'typeorm';
import { Locker } from '../entities/locker.entity';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LockerService {
    constructor(
        @Inject(LockerRepositoryToken)
        private readonly lockerRepository: Repository<Locker>,
        private readonly configService: ConfigService,
    ) {}

    public async list(): Promise<Locker[]> {
        return await this.lockerRepository.find();
    }

    public async findById(id: number): Promise<Locker> {
        return await this.lockerRepository.findOne(id);
    }

    public async create(secret: string): Promise<Locker> {
        // if (this.configService.iotDeviceSecret !== secret) {
        //     throw new UnauthorizedException('Wrong secret');
        // }
        try {
            const locker = new Locker();
            await this.lockerRepository.save(locker);
            return locker;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    public async edit(id: number, value: Partial<Locker>) {
        await this.lockerRepository.update(id, value);
    }

    public async delete(id: number) {
        await this.lockerRepository.delete(id);
    }
}
