import { Test, TestingModule } from '@nestjs/testing';
import { FormasController } from './formas.controller';

describe('FormasController', () => {
  let controller: FormasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormasController],
    }).compile();

    controller = module.get<FormasController>(FormasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
