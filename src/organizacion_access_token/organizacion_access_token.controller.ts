import { BadRequestException, Body, Controller, Delete, Get, Header, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrganizacionAccessTokenService } from './organizacion_access_token.service';
import { CreateOrganizacionAccessTokenDto } from './dto/create-organizacion_access_token.controller.dto';
import mongoose from 'mongoose';

@Controller('organizacion-access-token')
export class OrganizacionAccessTokenController {

    constructor(private organizacionAccessTokenService: OrganizacionAccessTokenService){}

    @Post()
    async generarAccessToken(@Body() data: {email_dest: string, id_organizacion: string, duracion: number}){
        return this.organizacionAccessTokenService.generarAccessToken(data.email_dest, data.id_organizacion, data.duracion)
    }

    @Post('test/:email_dest/:id_organizacion/:duracion')
    async generarAccessTokenTest(@Param('email_dest') email_dest: string, @Param('id_organizacion') id_organizacion: string, @Param('duracion') duracion: number){
        return this.organizacionAccessTokenService.generarAccessToken(email_dest, id_organizacion, duracion)
    }

    @Delete(':id')
    async deleteAccessToken(@Param('id') id: string){

        const valido = mongoose.Types.ObjectId.isValid(id)
        if(!valido){
            throw new HttpException('id no valido', 404)
        }

        const deletedToken = await this.organizacionAccessTokenService.deleteAccessToken(id)
    
        if(!deletedToken){
            throw new HttpException('AccessToken no encontrado', 404)
        }
        
        return deletedToken
    }

    @Get('validar/:codigo')
    async validarToken(@Param('codigo') codigo: string){
        const act = Date.now()
        let valido = false
        try{
            const token = this.organizacionAccessTokenService.getAccessTokenByCodigo(codigo)

            // valida que el usuario no este ya en esa organizacion, si lo esta, elimina el token

            const duracionTokenMs = (await token).duracion * 60 * 60 * 1000
            const expiracionToken = (await token).creacion + duracionTokenMs
            if(expiracionToken > act){
                // valido
                valido = true
            }else{
                valido = false
            }
            console.log('Se elimina el token ', (await token)._id,', se confima como ', valido, ' con expiracion ', expiracionToken, ', siendo el momento actual ', act)
            this.organizacionAccessTokenService.deleteAccessToken((await token)._id)
            return valido
        } catch (e) {
            console.log('Error al validar el token')
        }
    }
}
