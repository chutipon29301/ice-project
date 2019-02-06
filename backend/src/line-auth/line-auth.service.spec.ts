import { Test, TestingModule } from '@nestjs/testing';
import { LineAuthService } from './line-auth.service';
import { LineAuthModule } from './line-auth.module';

describe('LineAuthService', () => {
    let service: LineAuthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LineAuthModule],
            // providers: [LineAuthService],
        }).compile();
        service = module.get<LineAuthService>(LineAuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
