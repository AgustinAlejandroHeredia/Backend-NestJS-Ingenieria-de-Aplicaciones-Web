import { BadRequestException, Body, Controller, Delete, Get, Header, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrganizacionAccessTokenService } from './organizacion_access_token.service';
import { CreateOrganizacionAccessTokenDto } from './dto/create-organizacion_access_token.controller.dto';
import { OrganizacionesService } from 'src/organizaciones/organizaciones.service';
import { Types } from 'mongoose';

@Controller('organizacion-access-token')
export class OrganizacionAccessTokenController {

    constructor(private organizacionAccessTokenService: OrganizacionAccessTokenService, private organizacionesService: OrganizacionesService){}

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

        const valido = Types.ObjectId.isValid(id)
        if(!valido){
            throw new HttpException('id no valido', 404)
        }

        const deletedToken = await this.organizacionAccessTokenService.deleteAccessToken(id)
    
        if(!deletedToken){
            throw new HttpException('AccessToken no encontrado', 404)
        }
        
        return deletedToken
    }

    @Get('validar/:codigo/:userId/:userNombre')
    async validarToken(@Param('codigo') codigo: string, @Param('userId') userId: string, @Param('userNombre') userNombre: string){
        console.log('Llega aca')
        const act = Date.now()
        try{
            const token = await this.organizacionAccessTokenService.getAccessTokenByCodigo(codigo)

            if(!token){
                throw new Error('No existe un token con ese codigo')
            }

            console.log('Existe token -> (', token, ')')

            // vencido?
            const duracionTokenMs = (await token).duracion * 60 * 60 * 1000
            const expiracionToken = (await token).creacion + duracionTokenMs
            let expirado: boolean
            if(expiracionToken > act){
                // valido
                expirado = false
                console.log('No esta expirado')
            }else{
                expirado = true
                console.log('Esta expirado')
            }

            let pertenece: boolean
            if(await this.organizacionesService.userPerteneceAOrganizacion(userId, token.organizacion_id)){
                // si el usuario pertenece a la organizacion ya, el token es invalido porque no sirve
                pertenece = true
                console.log('El usuario ya pertenece a esta organizacion')
            }else{
                console.log('El usuario no pertenece a la organizacion')
                pertenece = false
            }

            let valido: boolean
            if(!expirado && !pertenece){
                valido = true

                // agrega el usuario a la organizacion
                this.organizacionesService.cargarUser(userId, userNombre, token.organizacion_id)
                console.log('Usuario añadido a la organizacion con id ',token.organizacion_id)

            }else{
                valido = false
            }

            console.log('Se elimina el token ', (await token)._id,', se confima como ', valido, ' con expiracion ', expiracionToken, ', siendo el momento actual ', act)
            this.organizacionAccessTokenService.deleteAccessToken(String((await token)._id))
            return valido
        } catch (e) {
            console.log('Error al validar el token')
        }
    }
}
