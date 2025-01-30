import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecortesService } from './recortes.service';
import { CreateRecorteDto } from './dto/create-recorte.dto';
import { fromBuffer } from "pdf2pic";
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as stream from 'stream';

@Controller('recortes')
export class RecortesController {

    constructor(private readonly recortesService: RecortesService){}

    // los recortes no se guardan en backblaze, sino que se registra el recorte hecho en mongo, cuando el usuario realiza el recorte, este se descarga

    // genera registro en mongo
    @Post()
    createRecorte(@Body() createRecorteDto: CreateRecorteDto){
        console.log('CREACION DE RECORTE, INFO: ', createRecorteDto)
        return this.recortesService.createRecorte(createRecorteDto)
    }

    // obtiene los recortes por usuario
    @Get('user/:userId')
    getRecortesByUserId(@Param('userId') userId: string){
        return this.recortesService.getRecortesByUserId(userId)
    }

    @Get('convert_pdf_to_pic/:id_backblaze/:pagina_seleccionada')
    async convertirPdf2Pic(@Param('id_backblaze') id_backblaze: string, @Param('pagina_seleccionada') pagina_seleccionada: number, @Res() res: Response,){
        try {
            const bufferPaginaSeleccionada = await this.recortesService.convertirPdf(id_backblaze, pagina_seleccionada);

            console.log('bufferPaginaSeleccionada -> ', bufferPaginaSeleccionada)

            res.setHeader('Content-Disposition', `attachment; filename="pagina_pdf_convertida"`)
            res.setHeader('Content-Type', 'image/png')
            //res.send(bufferPaginaSeleccionada)

            // sirvo el contenido
            const readStream = new stream.PassThrough();
            readStream.end(bufferPaginaSeleccionada);
            readStream.pipe(res);
            
        } catch (error) {
            console.log('ERROR EN CONVERSION', error);
            res.status(500).send("Error al convertir pdf a imagen")
        }
    }

}
