import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationModule } from './location.module';

describe('Location Controller', () => {
    let controller: LocationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // controllers: [LocationController],
            imports: [LocationModule],
        }).compile();

        controller = module.get<LocationController>(LocationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
