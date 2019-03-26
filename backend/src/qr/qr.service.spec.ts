import { Test, TestingModule } from '@nestjs/testing';
import { QrService } from './qr.service';
import { ConfigModule } from '../config/config.module';
import { LockerModule } from '../locker/locker.module';

describe('QrService', () => {
    let service: QrService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule, LockerModule],
            providers: [QrService],
        }).compile();
        service = module.get<QrService>(QrService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
