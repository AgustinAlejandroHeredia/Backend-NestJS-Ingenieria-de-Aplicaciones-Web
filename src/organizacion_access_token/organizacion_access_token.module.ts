import { Module } from '@nestjs/common';
import { OrganizacionAccessTokenController } from './organizacion_access_token.controller';
import { OrganizacionAccessTokenService } from './organizacion_access_token.service';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { OrganizacionAccessTokenSchema, OrganizacionAccessToken } from 'src/schemas/OrganizacionAccessToken.schema';

@Module({
  imports: [ MongooseModule.forFeature([{
    name: OrganizacionAccessToken.name,
    schema: OrganizacionAccessTokenSchema,
  }])],

  controllers: [OrganizacionAccessTokenController],
  providers: [OrganizacionAccessTokenService]
})
export class OrganizacionAccessTokenModule {}
