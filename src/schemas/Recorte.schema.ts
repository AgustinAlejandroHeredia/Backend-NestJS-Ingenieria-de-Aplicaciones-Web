import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Recorte {

    @Prop({required:false})
    filename: string

    @Prop({required: false})
    fecha_creacion: number

    @Prop({required: false})
    subido_por: string

    @Prop({required: false})
    user_id: string

    @Prop({required:false})
    size:number;

    @Prop({required: false})
    type: string

    @Prop({required: false})
    especialidad: string

    @Prop({required: false})
    etiquetas: string

    @Prop({required: false})
    id_plano_original_mongo: string

}

export const RecorteSchema = SchemaFactory.createForClass(Recorte)