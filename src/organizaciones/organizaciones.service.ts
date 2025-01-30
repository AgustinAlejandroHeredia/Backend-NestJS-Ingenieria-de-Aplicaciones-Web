import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizacion } from 'src/schemas/Organizacion.schema';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';

@Injectable()
export class OrganizacionesService {

    constructor(@InjectModel(Organizacion.name) private organizacionModel: Model<Organizacion>){}
    // constructor(@InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>){

    async createOrganizacion(createOrganizacionDto: CreateOrganizacionDto){
        const nuevaOrganizacion = new this.organizacionModel(createOrganizacionDto);
        return nuevaOrganizacion.save()
    }

    async getOrganizacionesByUserId(userId: string){
        return this.organizacionModel.findOne({'usuarios': userId}).exec()
    }

    async getOrganizacionesViewByUserId(userId: string){
        const organizaciones = await this.organizacionModel.find({'usuarios': userId})
        return organizaciones.map(org => ({
            _id: org._id,
            nombre: org.nombre,
            direccion: org.direccion,
            contactos: org.contactos,
            forma: org.forma,
        }))
    }

    async cargarUser(userId: string, organizacionId: string){
        return this.organizacionModel.findByIdAndUpdate(
            organizacionId,
            { $push: { usuarios: userId} },
            { new: true}
        )
    }

}
