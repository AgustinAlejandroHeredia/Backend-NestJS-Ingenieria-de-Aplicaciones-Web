import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// DTOs
import { CreateArchivoDto } from './dto/create-archivo.dto';

// MONGOOSE
import { Model } from 'mongoose';

// SCHEMAS
import { Archivo, ArchivoSchema } from 'src/schemas/Archivo.schema';
import { ReturningStatementNotSupportedError } from 'typeorm';

@Injectable()
export class ArchivosService {

    // parte de conectar con DB
    constructor(@InjectModel(Archivo.name) private archivoModel: Model<Archivo>){}

    // guarda imagen
    async createArchivo(createArchivoDto: CreateArchivoDto){
        const nuevoArchivo = new this.archivoModel(createArchivoDto);
        return nuevoArchivo.save()
    }

    extraerTipo(nombre_archivo: string){
        return nombre_archivo.split('.').pop()?.toLowerCase()
    }

    async yaExiste(nombre_archivo: string): Promise<any> {
        const res = await this.archivoModel.findOne({ filename: nombre_archivo })
        if(res != null){
            return true
        }
        return false
    }

}
