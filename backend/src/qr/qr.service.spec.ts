import { Test, TestingModule } from '@nestjs/testing';
import { QrService } from './qr.service';

describe('QrService', () => {
    let service: QrService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QrService],
        }).compile();
        service = module.get<QrService>(QrService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
