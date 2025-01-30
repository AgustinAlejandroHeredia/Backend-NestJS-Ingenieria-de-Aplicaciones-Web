import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Forma {

    @Prop({required:false})
    letra: string

    @Prop({required:false})
    numero: number

    @Prop({required:false})
    year: number

    @Prop({required:false})
    partida: string

}

export const FormaSchema = SchemaFactory.createForClass(Forma)