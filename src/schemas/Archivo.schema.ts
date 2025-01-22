import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Archivo extends Document {

    //originalname
    @Prop({required:false})
    filename?: string;

    // encoding
    @Prop({required:false})
    encoding?:string;

    // mimetype
    @Prop({required:false})
    mimetype?:string;

    // buffer
    @Prop({required:false})
    buffer?:Buffer;

    // size
    @Prop({required:false})
    size?:number;

    // fecha de subida
    @Prop({required:false})
    fecha_creacion: number;

    // tipo de archivo
    @Prop({required:false})
    tipo: string;

    // usuario que sube el plano
    @Prop({required:false})
    subido_por: string

}

export const ArchivoSchema = SchemaFactory.createForClass(Archivo);