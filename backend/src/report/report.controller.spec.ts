import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';

describe('Report Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ReportController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ReportController = module.get<ReportController>(ReportController);
    expect(controller).toBeDefined();
  });
});
