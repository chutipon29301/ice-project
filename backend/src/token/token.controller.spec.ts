import { Test, TestingModule } from '@nestjs/testing';
import { TokenController } from './token.controller';
import { TokenModule } from './token.module';

describe('Token Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TokenModule],
        }).compile();
    });
    it('should be defined', () => {
        const controller: TokenController = module.get<TokenController>(
            TokenController,
        );
        expect(controller).toBeDefined();
    });
});
