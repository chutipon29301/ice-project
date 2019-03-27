import { Test, TestingModule } from '@nestjs/testing';
import { ShareLockerService } from './share-locker.service';

describe('ShareLockerService', () => {
  let service: ShareLockerService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareLockerService],
    }).compile();
    service = module.get<ShareLockerService>(ShareLockerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
