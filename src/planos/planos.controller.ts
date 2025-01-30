import { BadRequestException, Body, Controller, Delete, Get, Header, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlanosService } from './planos.service';

// DTO
import { CreatePlanoDto } from './dto/create-plano.dto';
import mongoose from 'mongoose';
import { UpdatePlanoDto } from 'src/planos - backup/dto/update-plano.dto';

import { HttpHeaders } from '@angular/common/http';
import { Response } from 'express';
import * as stream from 'stream';

@Controller('planos')
export class PlanosController {

    constructor(private readonly planosService: PlanosService){}

    // TESTED
    @Post('upload')
    @UseInterceptors(FileInterceptor('archivo'))
    async subirPlano(@UploadedFile() archivo: Express.Multer.File, @Body('username') username: string, @Body('proyectoId') proyectoId: string){
        console.log('LLEGA A NEST')
        try{

            if(!archivo){
                throw new Error('ErrorArchivo')
            }

            if(!username || !proyectoId){
                throw new Error('ErrorInfo')
            }

            if(!this.planosService.yaExiste(archivo.originalname)){
                throw new Error('ErrorYaExiste')
            }

            // sube el archivo a backblaze
            const PlanoIdBackblaze = await this.planosService.createPlanoBackblaze(archivo);
            console.log('Resultado (backblaze): ', PlanoIdBackblaze);

            // pone un registro del upload a backblaze en mongo
            const createPlanoDto: CreatePlanoDto = {
                filename: archivo.originalname,
                fecha_creacion: Date.now(),
                subido_por: username,
                size: archivo.size,
                type: this.planosService.extraerTipo(archivo.originalname),
                id_plano_backblaze: PlanoIdBackblaze,
            }
            const resultadoMongo = await this.planosService.createPlanoMongo(createPlanoDto, proyectoId)
            console.log('Resultado (mongo): ', resultadoMongo)

            return { mensaje: 'Archivo subido con éxito' }; // devuelve codigo 200 automaticamente

        } catch (error) {
            if(error instanceof Error){
                switch (error.message) {
                    case 'ErrorArchivo':
                        console.error('No se ha proporcionado un archivo')
                        break;
                    case 'ErrorInfo':
                        console.error('Falta informacion para realizar la operacion')
                        break;
                    case 'ErrorYaExiste':
                        console.error('Ya existe este archivo')
                        break;
                }
            }else{
                console.error('Error inesperado: ', error)
            }
        }
    }

    // TESTED
    @Get(':id')
    async getPlanoById(@Param('id') id: string) {
            
    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
        throw new HttpException('id no valido', 404)
    }
        
    // busca el plano en la DB
    const plano = await this.planosService.getPlanoById(id)
    if(!plano){
        throw new HttpException('Plano no encontrado', 404)
    }
    return plano
    }

    @Patch(':id')
    updatePlano(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
        
        // revisa que la id sea valida para cast a ObjectID que usa MongoDB
        const valido = mongoose.Types.ObjectId.isValid(id)
        if(!valido){
            throw new HttpException('id no valido', 404)
        }
        
        return this.planosService.updatePlano(id, updatePlanoDto)
    }

    // TESTED
    @Delete(':id')
    async deletePlano(@Param('id') id: string) {
        
    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
        throw new HttpException('id no valido', 404)
    }
    
    const deletedPlano = await this.planosService.deletePlano(id)
    
    if(!deletedPlano){
        throw new HttpException('Plano no encontrado', 404)
    }
    
    return deletedPlano
    }

    // TESTED
    @Get('download/:plano')
    async downloadPlano(@Param('plano') id_plano_backblaze: string, @Res() res: Response) {
        if(!id_plano_backblaze){
            throw new HttpException('No se provee id', 404)
        }

        console.log('downloadPlano() (controller) -> se solicita la descarga del plano con id backblaze: ',id_plano_backblaze)

        // obtiene la informacion del archivo a descargar
        const planoInfo = await this.planosService.infoPlanoBackblaze(id_plano_backblaze)

        // se descarga el archivo
        const planoData = await this.planosService.downloadPlano(id_plano_backblaze)

        // se prepara la respuesta
        res.setHeader('Content-Disposition', `attachment; filename="${planoInfo.data.fileName}"`)
        res.setHeader('Content-Type', planoInfo.data.contentType)

        // sirvo el contenido
        const readStream = new stream.PassThrough();
        readStream.end(planoData.data);
        readStream.pipe(res);
    }

    @Get('view/:id')
    async viewPlano(@Param('id') id_plano_backblaze: string, @Res() res: Response) {
        try {
            if(!id_plano_backblaze){
                throw new HttpException('No se provee id', 404)
            }

            console.log('viewPlano() (controller) -> se solicita la vista del plano con id backblaze: ',id_plano_backblaze)

            // obtiene la informacion del archivo a descargar
            const planoInfo = await this.planosService.infoPlanoBackblaze(id_plano_backblaze)

            // se descarga el archivo
            const planoDescargado = await this.planosService.downloadPlano(id_plano_backblaze)

            // se prepara la respuesta
            res.setHeader('Content-Disposition', `attachment; filename="${planoInfo.data.fileName}"`)
            res.setHeader('Content-Type', planoInfo.data.contentType)
            //res.send(planoInfo.data.Body)

            // sirvo el contenido
            const readStream = new stream.PassThrough();
            readStream.end(planoDescargado.data);
            readStream.pipe(res);

        } catch (error) {
            console.log('ERROR EN viewPlano() (controller) -> ', error)
        }
    }

}