import { Test, TestingModule } from '@nestjs/testing';
import { CreditUsageController } from './credit-usage.controller';

describe('CreditUsage Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [CreditUsageController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: CreditUsageController = module.get<CreditUsageController>(CreditUsageController);
        expect(controller).toBeDefined();
    });
});
