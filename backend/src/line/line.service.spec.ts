import { LineModule } from './line.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LineService } from './line.service';

describe('LineService', () => {
    let service: LineService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // providers: [LineService],
            imports: [LineModule],
        }).compile();
        service = module.get<LineService>(LineService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
