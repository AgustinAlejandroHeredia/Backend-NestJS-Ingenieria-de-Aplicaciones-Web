import { Module } from '@nestjs/common';
import { RecortesService } from './recortes.service';
import { RecortesController } from './recortes.controller';

import { PlanosService } from 'src/planos/planos.service';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { Recorte, RecorteSchema } from 'src/schemas/Recorte.schema';
import { PlanosModule } from 'src/planos/planos.module';

@Module({

  imports: [
    MongooseModule.forFeature([{
      name: Recorte.name,
      schema: RecorteSchema,
    }]),
    PlanosModule,
  ],

  providers: [RecortesService],
  controllers: [RecortesController]
})
export class RecortesModule {}
