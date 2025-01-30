import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionAccessTokenController } from './organizacion_access_token.controller';

describe('OrganizacionAccessTokenController', () => {
  let controller: OrganizacionAccessTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizacionAccessTokenController],
    }).compile();

    controller = module.get<OrganizacionAccessTokenController>(OrganizacionAccessTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
