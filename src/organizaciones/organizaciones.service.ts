import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizacion } from 'src/schemas/Organizacion.schema';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { FormasService } from 'src/formas/formas.service';

//import { ProyectosService } from 'src/proyectos/proyectos.service';
import { NotFoundError } from 'rxjs';
//import { Proyecto } from 'src/schemas/Proyecto.schema';

@Injectable()
export class OrganizacionesService {

    constructor(private formasService:FormasService, @InjectModel(Organizacion.name) private organizacionModel: Model<Organizacion>){}

    async createOrganizacion(createOrganizacionDto: CreateOrganizacionDto){
        const nuevaOrganizacion = new this.organizacionModel(createOrganizacionDto);
        return nuevaOrganizacion.save()
    }

    async getOrganizacionById(organizacionId: string){
        return this.organizacionModel.findById(organizacionId)
    }

    async getOrganizacionesByUserId(userId: string){
        return this.organizacionModel.findOne({
            usuarios: { $elemMatch: { id: userId } },
        }).exec()
    }

    async getOrganizacionesViewByUserId(userId: string){
        const organizaciones = await this.organizacionModel.find({
            usuarios: { $elemMatch: { id: userId } }
        }).exec();
        return organizaciones.map(org => ({
            _id: org._id,
            nombre: org.nombre,
            direccion: org.direccion,
            contactos: org.contactos,
            forma: org.forma,
        }))
    }

    async cargarUser(userId: string, nombreUsuario: string, organizacionId: string) {
        const usuario = { id: userId, nombre: nombreUsuario };
    
        return this.organizacionModel.findByIdAndUpdate(
            organizacionId,
            { $push: { usuarios: usuario } },
            { new: true }
        ).exec();
    }

    async userPerteneceAOrganizacion(userId: string, organizacionId: string): Promise<boolean> {
        const organizacion = await this.organizacionModel.findOne({
            usuarios: { $elemMatch: { id: userId } },
            _id: organizacionId,
        }).exec();

        console.log('RESULTADO DE BUSQUEDA -> ', organizacion)

        return organizacion ? true : false;
    }

    async nombreByIdOrganizacion(idOrganizacion: string): Promise<string>{
        const organizacion = await this.organizacionModel.findById(idOrganizacion).exec()
        return organizacion ? organizacion.nombre : null
    }

    async eliminarUsuario(idOrganizacion: string, idUsuario: string){
        return this.organizacionModel.findOneAndUpdate(
            { _id: idOrganizacion },
            { $pull: { usuarios: { id: idUsuario } } }, // Elimina el usuario de la lista de la organización
            { new: true }
        ).exec();
    }

}
