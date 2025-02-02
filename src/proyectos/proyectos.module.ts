import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { Proyecto, ProyectoSchema } from 'src/schemas/Proyecto.schema';

@Module({

  imports: [MongooseModule.forFeature([{
    name: Proyecto.name,
    schema: ProyectoSchema,
  }])],
  
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
