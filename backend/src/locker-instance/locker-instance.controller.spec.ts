import { Test, TestingModule } from '@nestjs/testing';
import { LockerInstanceController } from './locker-instance.controller';

describe('LockerInstance Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [LockerInstanceController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: LockerInstanceController = module.get<
            LockerInstanceController
        >(LockerInstanceController);
        expect(controller).toBeDefined();
    });
});
