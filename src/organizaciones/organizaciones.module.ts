import { Module } from '@nestjs/common';
import { OrganizacionesController } from './organizaciones.controller';
import { OrganizacionesService } from './organizaciones.service';
import { FormasModule } from 'src/formas/formas.module';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { OrganizacionSchema, Organizacion } from 'src/schemas/Organizacion.schema';

@Module({
    imports: [ 
        MongooseModule.forFeature([{
        name: Organizacion.name,
        schema: OrganizacionSchema,
    }]),
        FormasModule,
    ],
    
    providers: [OrganizacionesService],
    controllers: [OrganizacionesController],
    exports: [OrganizacionesService, MongooseModule],
})
export class OrganizacionesModule {}
