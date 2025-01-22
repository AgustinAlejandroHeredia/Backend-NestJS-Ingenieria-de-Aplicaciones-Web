import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArchivosService } from './archivos.service';

// DTO
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { arch } from 'os';

@Controller('archivos')
export class ArchivosController {

    constructor(private readonly archivosService: ArchivosService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('archivo'))
    async subirArchivo(@UploadedFile() archivo: Express.Multer.File, @Body('username') username: string){
        if (!archivo) {
            throw new BadRequestException('No se ha proporcionado ningún archivo');
        }

        if (this.archivosService.yaExiste(archivo.originalname)) {
            throw new BadRequestException('Ya existe un documento con este nombre')
        }
        
        const createArhcivoDto: CreateArchivoDto = {
            filename: archivo.originalname,
            encoding: archivo.encoding,
            mimetype: archivo.mimetype,
            buffer: archivo.buffer,
            size: archivo.size,
            tipo: this.archivosService.extraerTipo(archivo.originalname),
            fecha_creacion: Date.now(),
            subido_por: username,
        }

        this.archivosService.createArchivo(createArhcivoDto)

        return { message: 'Archivo subido con éxito', fileName: archivo.originalname };
    }

}
