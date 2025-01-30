import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionAccessTokenService } from './organizacion_access_token.service';

describe('OrganizacionAccessTokenService', () => {
  let service: OrganizacionAccessTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizacionAccessTokenService],
    }).compile();

    service = module.get<OrganizacionAccessTokenService>(OrganizacionAccessTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
