import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Forma } from "./Forma.schema";
import mongoose from "mongoose";

@Schema()
export class Organizacion {

    @Prop({required:false})
    nombre: string

    @Prop({required:false})
    direccion: string

    @Prop({required:false})
    contactos: string

    @Prop({required:false})
    usuarios?: string[]

    @Prop({ required:false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forma' }] })
    forma: Forma
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion)