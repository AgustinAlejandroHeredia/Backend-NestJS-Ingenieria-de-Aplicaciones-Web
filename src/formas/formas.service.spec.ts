import { Test, TestingModule } from '@nestjs/testing';
import { FormasService } from './formas.service';

describe('FormasService', () => {
  let service: FormasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormasService],
    }).compile();

    service = module.get<FormasService>(FormasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
