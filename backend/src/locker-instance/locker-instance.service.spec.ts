import { Test, TestingModule } from '@nestjs/testing';
import { LockerInstanceService } from './locker-instance.service';

describe('LockerInstanceService', () => {
    let service: LockerInstanceService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LockerInstanceService],
        }).compile();
        service = module.get<LockerInstanceService>(LockerInstanceService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
