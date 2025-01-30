import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Plano {

/* Originalmente para almacenar el archivo en mongo

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

*/

// para backblaze

    @Prop({required:false})
    filename: string

    @Prop({required: false})
    fecha_creacion: number

    @Prop({required: false})
    subido_por: string

    @Prop({required:false})
    size?:number;

    @Prop({required: false})
    type: string

    @Prop({required: false})
    id_plano_backblaze: string

}

export const PlanoSchema = SchemaFactory.createForClass(Plano)