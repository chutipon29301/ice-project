import { Test, TestingModule } from '@nestjs/testing';
import { ShareLockerController } from './share-locker.controller';

describe('ShareLocker Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [ShareLockerController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: ShareLockerController = module.get<
            ShareLockerController
        >(ShareLockerController);
        expect(controller).toBeDefined();
    });
});
