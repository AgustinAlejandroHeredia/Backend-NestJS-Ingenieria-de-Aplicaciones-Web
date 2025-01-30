import { Injectable } from '@nestjs/common';
import { PlanosService } from 'src/planos/planos.service';
import { Response } from 'express';

import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

// DTOs
import { CreateRecorteDto } from './dto/create-recorte.dto';

// MONGOOSE
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Recorte, RecorteSchema } from 'src/schemas/Recorte.schema';
import { from } from 'form-data';

@Injectable()
export class RecortesService {

    constructor(
        private readonly planoService: PlanosService,
        @InjectModel(Recorte.name) private recorteModel: Model<Recorte>,
    ){}

    async createRecorte(createRecorteDto: CreateRecorteDto){
        const nuevoRecorte = new this.recorteModel(createRecorteDto);
        return nuevoRecorte.save()
    }

    async getRecortesByUserId(userId: string){
        console.log('Se envian los recortes para el usuario ',userId)
        return this.recorteModel.find({user_id: userId})
    }

    // no funciona, aparentemente no hay forma de hacer que gm encuentre ImageMagick 
    async convertirPdf(id_backblaze: string, pagina_seleccionada: number): Promise<any> {
        try {

            const sharp = require('sharp');

            const response = await this.planoService.downloadPlano(id_backblaze);
            const pdfBuffer = response.data

            console.log('PDFBUFFER -> ', pdfBuffer)

            const pdfDoc = await PDFDocument.load(pdfBuffer);
            const pages = pdfDoc.getPages();

            if (pagina_seleccionada < 1 || pagina_seleccionada > pages.length) {
                throw new Error('Número de página inválido.');
            }

            const page = pages[pagina_seleccionada - 1];
            /*
            const width = 800; // Ancho de la imagen de salida
            const height = Math.round((page.getHeight() / page.getWidth()) * width);
            */

            const { width , height } = await page.getSize()

            console.log('WIDTH y HEIGHT -> ', width, ' ', height)

            const pageBuffer = await sharp({
                create: {
                    width,
                    height,
                    channels: 3,
                    background: { r: 255, g: 255, b: 255 },
                },
            })
                .png()
                .toBuffer();

            console.log('PAGEBUFFER -> ', pageBuffer)

            return pageBuffer;
            
          } catch (error) {
            console.error("Error en convertirPdf() -> ", error);
          }
    }

}
