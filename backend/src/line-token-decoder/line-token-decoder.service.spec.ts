import { LineTokenDecoderModule } from './line-token-decoder.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LineTokenDecoderService } from './line-token-decoder.service';

describe('LineTokenDecoderService', () => {
    let service: LineTokenDecoderService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LineTokenDecoderModule],
        }).compile();
        service = module.get<LineTokenDecoderService>(LineTokenDecoderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
