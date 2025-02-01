import { Module } from '@nestjs/common';
import { OrganizacionAccessTokenController } from './organizacion_access_token.controller';
import { OrganizacionAccessTokenService } from './organizacion_access_token.service';
import { OrganizacionesModule } from 'src/organizaciones/organizaciones.module';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { OrganizacionAccessTokenSchema, OrganizacionAccessToken } from 'src/schemas/OrganizacionAccessToken.schema';
import { Organizacion, OrganizacionSchema } from 'src/schemas/Organizacion.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([{
      name: OrganizacionAccessToken.name,
      schema: OrganizacionAccessTokenSchema,
    },
    {
      name: Organizacion.name,
      schema: OrganizacionSchema,
    }]),
    OrganizacionesModule,
  ],

  controllers: [OrganizacionAccessTokenController],
  providers: [OrganizacionAccessTokenService]
})
export class OrganizacionAccessTokenModule {}
