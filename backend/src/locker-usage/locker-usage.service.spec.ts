import { Test, TestingModule } from '@nestjs/testing';
import { LockerUsageService } from './locker-usage.service';

describe('LockerUsageService', () => {
  let service: LockerUsageService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LockerUsageService],
    }).compile();
    service = module.get<LockerUsageService>(LockerUsageService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
