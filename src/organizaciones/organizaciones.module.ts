import { Module } from '@nestjs/common';
import { OrganizacionesController } from './organizaciones.controller';
import { OrganizacionesService } from './organizaciones.service';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { OrganizacionSchema, Organizacion } from 'src/schemas/Organizacion.schema';

@Module({
    imports: [ MongooseModule.forFeature([{
        name: Organizacion.name,
        schema: OrganizacionSchema,
    }])],
    
    providers: [OrganizacionesService],
    controllers: [OrganizacionesController],
    exports: [OrganizacionesService],
})
export class OrganizacionesModule {}
