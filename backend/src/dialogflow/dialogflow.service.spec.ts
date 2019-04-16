import { Test, TestingModule } from '@nestjs/testing';
import { DialogflowService } from './dialogflow.service';

describe('DialogflowService', () => {
    let service: DialogflowService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DialogflowService],
        }).compile();

        service = module.get<DialogflowService>(DialogflowService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
