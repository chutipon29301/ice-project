import { LineModule } from './line.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LineController } from './line.controller';

describe('Line Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            // controllers: [LineController],
            imports: [LineModule],
        }).compile();
    });
    it('should be defined', () => {
        const controller: LineController = module.get<LineController>(
            LineController,
        );
        expect(controller).toBeDefined();
    });
});
