import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Organizacion } from "./Organizacion.schema";
import mongoose from "mongoose";

@Schema()
export class OrganizacionAccessToken {

    //@Prop({ required:false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organizacion' }] })
    //organizacion_id: Organizacion

    @Prop({required:false})
    organizacion_id: string

    @Prop({required:false})
    creacion: number

    @Prop({required:false})
    duracion: number

    @Prop({required:false})
    codigo: string

}

export const OrganizacionAccessTokenSchema = SchemaFactory.createForClass(OrganizacionAccessToken)