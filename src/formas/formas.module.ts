import { Module } from '@nestjs/common';
import { FormasController } from './formas.controller';
import { FormasService } from './formas.service';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';

// SCHEMAS
import { FormaSchema, Forma } from 'src/schemas/Forma.schema';

@Module({
    imports: [ MongooseModule.forFeature([{
        name: Forma.name,
        schema: FormaSchema,
    }])],
        
    providers: [FormasService],
    controllers: [FormasController],
    exports: [FormasService]
})
export class FormasModule {}
