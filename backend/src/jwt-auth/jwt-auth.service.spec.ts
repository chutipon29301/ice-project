import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthService', () => {
    let service: JwtAuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtAuthService],
        }).compile();
        service = module.get<JwtAuthService>(JwtAuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
