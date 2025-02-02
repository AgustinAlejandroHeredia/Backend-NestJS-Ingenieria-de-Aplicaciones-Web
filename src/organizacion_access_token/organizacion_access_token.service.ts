import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OrganizacionAccessToken } from 'src/schemas/OrganizacionAccessToken.schema';
import { CreateOrganizacionAccessTokenDto } from './dto/create-organizacion_access_token.controller.dto';

// envio de emails con el codigo correspondiente
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrganizacionAccessTokenService {

    private transporter

    constructor(@InjectModel(OrganizacionAccessToken.name) private organizacionAccessTokenModel: Model<OrganizacionAccessToken>){
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'agushcorreo@gmail.com',
                pass: 'fxzb bjxl ylnh smpu'
            }
        })
    }

    private async enviarEmail(to: string, subject: string, text: string): Promise<any>{
        const mailOptions = {
            from: 'agushcorreo@gmail.com',
            to: to,
            subject: subject,
            text: text,
        };
        try{

            const info = await this.transporter.sendMail(mailOptions)
            console.log('Email enviado a ', to)
            return info

        }catch (e){
            console.error('Error al enviar el email -> ',e)
        }
    }

    private generarCodigoAleatorio_1(): string {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const segmento = () => Array.from({ length: 4 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
      
        return `${segmento()} - ${segmento()} - ${segmento()} - ${segmento()}`;
    }

    private generarCodigoAleatorio_2(): string {
        return String(Math.floor(100000 + Math.random() * 900000))
    }

    /*

    desde el normal
    TOKEN RESULTANTE ->  {
        creacion: 1738470752302,
        duracion: 1,
        codigo: '104167',
        _id: new ObjectId("679ef56075874abff8134b9a")
    }

    desde el test
    TOKEN RESULTANTE ->  {
        organizacion_id: '679a46391ebb93698b9caee8',
        creacion: 1738470786937,
        duracion: 2,
        codigo: '333228',
        _id: new ObjectId("679ef58275874abff8134b9c")
    }

    */

    async generarAccessToken(email_dest: string, id_organizacion: string, duracion: number){
        const codigo = this.generarCodigoAleatorio_2()
        const createOrganizacionAccessTokenDto : CreateOrganizacionAccessTokenDto = {
            organizacion_id: id_organizacion,
            creacion: Date.now(),
            duracion: duracion,
            codigo: codigo,
        }
        const nuevoToken = new this.organizacionAccessTokenModel(createOrganizacionAccessTokenDto)

        const text = ('Su token de acceso es ' + String(codigo) + ', puede usarlo luego de iniciar sesion presionando en "Ingresar token". Este token es valido hasta ' + String(duracion) + 'h desde la entrega de este email.')
        const subject = 'Invitacion'

        this.enviarEmail(email_dest, subject, text)

        return nuevoToken.save()
    }

    async deleteAccessToken(tokenId: string){
        if (!mongoose.Types.ObjectId.isValid(tokenId)) {
            throw new Error('ID inválido');
        }
        const objectId = new mongoose.Types.ObjectId(tokenId);
        return this.organizacionAccessTokenModel.findByIdAndDelete(objectId)
    }

    async getAccessTokenByCodigo(codigo: string){
        return this.organizacionAccessTokenModel.findOne({'codigo': codigo}).exec()
    }
}