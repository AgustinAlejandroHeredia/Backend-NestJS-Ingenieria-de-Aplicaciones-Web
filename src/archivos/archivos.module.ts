import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { Archivo, ArchivoSchema } from 'src/schemas/Archivo.schema';

@Module({

  imports: [MongooseModule.forFeature([{
    name: Archivo.name,
    schema: ArchivoSchema,
  }])],

  providers: [ArchivosService],
  controllers: [ArchivosController]
})
export class ArchivosModule {}
