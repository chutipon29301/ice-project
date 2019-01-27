import { Test, TestingModule } from '@nestjs/testing';
import { LockerController } from './locker.controller';

describe('Locker Controller', () => {
    let controller: LockerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LockerController],
        }).compile();

        controller = module.get<LockerController>(LockerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
