import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    private generarCodigoAleatorio(): string {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const segmento = () => Array.from({ length: 4 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
      
        return `${segmento()} - ${segmento()} - ${segmento()} - ${segmento()}`;
    }

    async generarAccessToken(email_dest: string, id_organizacion: string, duracion: number){
        const codigo = this.generarCodigoAleatorio()
        const createOrganizacionAccessTokenDto : CreateOrganizacionAccessTokenDto = {
            organizacion_id: id_organizacion,
            creacion: Date.now(),
            duracion: duracion,
            codigo: codigo,
        }
        const nuevoToken = new this.organizacionAccessTokenModel(createOrganizacionAccessTokenDto)

        const text = ('Su token de acceso es ' + String(codigo) + ', puede usarlo luego de iniciar sesion presionando en "Ingresar token".')
        const subject = 'Invitacion'

        this.enviarEmail(email_dest, subject, text)

        return nuevoToken.save()
    }

    async deleteAccessToken(tokenId: string){
        return this.organizacionAccessTokenModel.findByIdAndDelete(tokenId)
    }

    async getAccessTokenByCodigo(codigo: string): Promise<any>{
        return this.organizacionAccessTokenModel.findOne({'codigo': codigo}).exec()
    }
}