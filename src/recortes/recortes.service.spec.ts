import { Test, TestingModule } from '@nestjs/testing';
import { RecortesService } from './recortes.service';

describe('RecortesService', () => {
  let service: RecortesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecortesService],
    }).compile();

    service = module.get<RecortesService>(RecortesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
