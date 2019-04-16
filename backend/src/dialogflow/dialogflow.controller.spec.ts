import { Test, TestingModule } from '@nestjs/testing';
import { DialogflowController } from './dialogflow.controller';

describe('Dialogflow Controller', () => {
    let controller: DialogflowController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DialogflowController],
        }).compile();

        controller = module.get<DialogflowController>(DialogflowController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
