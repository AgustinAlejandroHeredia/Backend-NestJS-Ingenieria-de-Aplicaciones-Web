import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { Plano, PlanoSchema } from 'src/schemas/Plano.schema';
import { Proyecto, ProyectoSchema } from 'src/schemas/Proyecto.schema';

@Module({
  imports: [ MongooseModule.forFeature([{
    name: Plano.name,
    schema: PlanoSchema,
  },
  {
    name: Proyecto.name,    // se registra proyecto dentro de planos.module
    schema: ProyectoSchema
  }
  ])],
  controllers: [PlanosController],
  providers: [PlanosService],
})
export class PlanosModule {}
