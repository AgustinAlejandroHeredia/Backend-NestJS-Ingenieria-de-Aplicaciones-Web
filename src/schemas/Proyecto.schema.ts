import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Plano } from "./Plano.schema";
import mongoose from "mongoose";
import { Organizacion } from "./Organizacion.schema";

@Schema()
export class Proyecto {

    @Prop({unique:false, required:false})
    nombre:string;

    @Prop({required:false})
    expediente?:string;

    @Prop({required:false})
    obra?:string;

    @Prop({required:false})
    destino?:string;

    @Prop({required:false})
    ubicacion?:string;

    @Prop({required:false})
    escala?:string;

    @Prop({required:false})
    otros?:string;

    @Prop({required:false})
    referencias?:string;

    @Prop({required:false})
    antecedentes?:string;

    @Prop({required:false})
    propietario:string;

    @Prop({required:false})
    proyectistas:string;

    @Prop({required:false})
    direccion_tecnica?:string;

    @Prop({required:false})
    estado?:string;

    // un array de Planos, se le indica a mongo db que se compone de ObjectIDs
    @Prop({ required:false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plano' }] })
    planos: Plano[]

    // usuarios que participan en este proyecto
    @Prop({required:false, type: [{ id: String, nombre: String}]})
    usuarios: { id: String, nombre: String}

    // id de la organizacion a la que pertenece
    @Prop({ required:false, type: mongoose.Schema.Types.ObjectId, ref: 'Organizacion' })
    id_organizacion: Organizacion

}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto)