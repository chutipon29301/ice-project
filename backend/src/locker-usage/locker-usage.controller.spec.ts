import { Test, TestingModule } from '@nestjs/testing';
import { LockerUsageController } from './locker-usage.controller';

describe('LockerUsage Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LockerUsageController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LockerUsageController = module.get<LockerUsageController>(LockerUsageController);
    expect(controller).toBeDefined();
  });
});
