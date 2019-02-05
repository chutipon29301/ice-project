import { LockerModule } from './locker.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LockerService } from './locker.service';

describe('LockerService', () => {
    let service: LockerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // providers: [LockerService],
            imports: [LockerModule],
        }).compile();

        service = module.get<LockerService>(LockerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
