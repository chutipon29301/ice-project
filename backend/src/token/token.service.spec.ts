import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { TokenModule } from './token.module';

describe('TokenService', () => {
    let service: TokenService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TokenModule],
        }).compile();
        service = module.get<TokenService>(TokenService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
