import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService],
    }).compile();
    service = module.get<ReportService>(ReportService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
