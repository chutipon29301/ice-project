import { Test, TestingModule } from '@nestjs/testing';
import { LockerController } from './locker.controller';
import { LockerModule } from './locker.module';

describe('Locker Controller', () => {
    let controller: LockerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // controllers: [LockerController],
            imports: [LockerModule],
        }).compile();

        controller = module.get<LockerController>(LockerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
