import { Test, TestingModule } from '@nestjs/testing';
import { QrController } from './qr.controller';

describe('Qr Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [QrController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: QrController = module.get<QrController>(QrController);
    expect(controller).toBeDefined();
  });
});
