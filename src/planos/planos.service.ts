import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// DTOs
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from 'src/planos - backup/dto/update-plano.dto';

// MONGOOSE
import { Model } from 'mongoose';

// SCHEMAS
import { Plano, PlanoSchema } from 'src/schemas/Plano.schema';
import { Proyecto } from 'src/schemas/Proyecto.schema';

// Archivos con Backblaze
import multer from 'multer';
import { NextFunction, Response } from 'express';
import BackBlazeB2 from 'backblaze-b2';
const B2 = require('backblaze-b2')


@Injectable()
export class PlanosService {

    private b2: BackBlazeB2
    private readonly logger = new Logger()

    // parte de conectar con DB
    constructor(
        @InjectModel(Plano.name) private planoModel: Model<Plano>,
        @InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>, // como se trata con planos pertenecientes a un proyecto, se trae el modelo proyecto
    ){
        this.b2 = new B2({
            applicationKeyId: '0052d9ef99435720000000003',
            applicationKey: 'K005/7rr7ZSKuuPiaKPQcdv8azucI3M'
        })
    }
    
    // guarda registro de imagen
    async createPlanoMongo(createPlanoDto: CreatePlanoDto, proyectoId: string){

        const proyecto = await this.proyectoModel.findById(proyectoId)
        if(!proyecto){
            throw new HttpException('Proyecto no encontrado', 404)
        }

        const nuevoPlano = new this.planoModel(createPlanoDto);

        await proyecto.updateOne({ // lo guarda y lo mete en el array de IDs de planos que hay en proyectos
            $push: {
                planos: (await nuevoPlano)._id
            }
        })

        return nuevoPlano.save()
    }

    async createPlanoBackblaze(file: Express.Multer.File): Promise<string>{
        try {

            console.log('CREATE!')

            // se autoriza el acceso
            await this.b2.authorize();

            // se obtiene el bucket que se va a usar
            const bucketName = 'Planos-IngeWeb'
            const bucketInfo = await this.b2.getBucket({ bucketName })
            const bucketId = bucketInfo.data.buckets[0].bucketId

            // obtiene la URL que se usa para la carga
            const uploadUrlResponse = await this.b2.getUploadUrl({ bucketId })
            const { uploadUrl, authorizationToken } = uploadUrlResponse.data

            // sube el archivo
            //const fileName = `${Date.now()}_${file.originalname}`
            const fileName = `${file.originalname}`
            const uploadResponse = await this.b2.uploadFile({
                uploadUrl,
                uploadAuthToken: authorizationToken,
                fileName,
                data: file.buffer,
            });

            this.logger.log(`Archivo subido con éxito: ${fileName}`);
            return uploadResponse.data.fileId;

        } catch (error) {

            console.log('ERROR EN SERVICE')

            this.logger.error('Error al subir el archivo', error)
            throw error

        }
    }

    // TESTED
    extraerTipo(nombre_archivo: string){
        return nombre_archivo.split('.').pop()?.toLowerCase()
    }
    
    // TESTED
    async yaExiste(nombre_archivo: string): Promise<any> {
        const res = await this.planoModel.findOne({ filename: nombre_archivo })
        if(res != null){
            return true
        }
        return false
    }
    
    getPlanos() {
        return this.planoModel.find()
    }
    
    // TESTED
    getPlanoById(id: string) {
        return this.planoModel.findById(id)
    }
    
    updatePlano(id: string, updatePlanoDto: UpdatePlanoDto) {
        return this.planoModel.findByIdAndUpdate(id, updatePlanoDto)
    }

    // TESTED
    async deletePlano(id: string) {
        try {
            // obtiene el plano de la db
            const plano = await this.getPlanoById(id)
            const plano_nombre = (await plano).filename
            const plano_id_backblaze = (await plano).id_plano_backblaze
            console.log('Buscando plano ',plano_nombre,' para eliminar, con id de backblaze ', plano_id_backblaze)

            // se autoriza el acceso
            await this.b2.authorize();
            
            // elimina archivo en backblaze
            const resultado_backblaze = await this.b2.deleteFileVersion({
                fileId: plano_id_backblaze,
                fileName: plano_nombre,
            })
            console.log('RESULTADO DE ELIMINACION (backblaze): ', resultado_backblaze)

            // elimina archivo en mongo
            const resultado_mongo = await this.planoModel.findByIdAndDelete(id)
            console.log('RESULTADO DE ELIMINACION (mongo): ', resultado_mongo)

            return resultado_mongo

        } catch (error) {
            console.log('ERROR EN deletePlano(): ', error)
        }
    }

    // TESTED
    async downloadPlano(plano_id_backblaze: string): Promise<any> {
        try {
            
            // se autoriza el acceso
            await this.b2.authorize();

            // se descarga el archivo
            const response = await this.b2.downloadFileById({
                fileId: plano_id_backblaze,
                responseType: 'arraybuffer'
            })

            console.log('Descarga del archivo con id_backblaze: ',plano_id_backblaze)
            return response;

        } catch (error) {
            console.log('ERROR EN downloadPlano() (service): ', error)
        }
    }

    // TESTED
    async infoPlanoBackblaze(id: string): Promise<any> {
        try{
            await this.b2.authorize()

            const info = await this.b2.getFileInfo({fileId : id})

            return info
        } catch (error) {
            console.log('ERROR EN viewPlano() (service) -> ', error)
        }
    }




    /*
    keyID:0052d9ef99435720000000003
    keyName:Planos-IngeWebKey
    applicationKey:K005/7rr7ZSKuuPiaKPQcdv8azucI3M
    */

    

}