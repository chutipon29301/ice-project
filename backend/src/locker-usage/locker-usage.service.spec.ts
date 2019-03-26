import { Test, TestingModule } from '@nestjs/testing';
import { LockerUsageService } from './locker-usage.service';
import { DatabaseModule } from '../database.module';
import { lockerUsageProviders } from './locker-usage.providers';

describe('LockerUsageService', () => {
    let service: LockerUsageService;

    beforeAll(async () => {
        //     const module: TestingModule = await Test.createTestingModule({
        //         imports: [DatabaseModule],
        //         providers: [LockerUsageService,...lockerUsageProviders),
        //     }).compile();
        //     service = module.get<LockerUsageService>(LockerUsageService);
        // });
        // it('should be defined', () => {
        //     expect(service).toBeDefined();
    });
});
