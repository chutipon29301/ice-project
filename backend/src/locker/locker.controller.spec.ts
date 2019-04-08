import { Test, TestingModule } from '@nestjs/testing';
import { LockerController } from './locker.controller';

describe('Locker Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [LockerController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: LockerController = module.get<LockerController>(LockerController);
        expect(controller).toBeDefined();
    });
});
