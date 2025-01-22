import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Plano {

    @Prop({required:false})
    subido_por?:string

    @Prop({required:false})
    nombre?:string;

    @Prop({required:false})
    especialidad?:string

    // archivo pdf o png

}

export const PlanoSchema = SchemaFactory.createForClass(Plano)