import { Test, TestingModule } from '@nestjs/testing';
import { RecortesController } from './recortes.controller';

describe('RecortesController', () => {
  let controller: RecortesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecortesController],
    }).compile();

    controller = module.get<RecortesController>(RecortesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
