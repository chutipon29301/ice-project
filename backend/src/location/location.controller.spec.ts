import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';

describe('Location Controller', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [LocationController],
        }).compile();
    });
    it('should be defined', () => {
        const controller: LocationController = module.get<LocationController>(
            LocationController,
        );
        expect(controller).toBeDefined();
    });
});
