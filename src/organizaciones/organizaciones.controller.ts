import { BadRequestException, Body, Controller, Delete, Get, Header, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { userInfo } from 'os';
import { ViewOrganizacionDto } from './dto/view-organizacion.dto';
import { CreateFormaDto } from 'src/formas/dto/create-forma.dto';
import { FormasService } from 'src/formas/formas.service';

@Controller('organizaciones')
export class OrganizacionesController {

    constructor(private readonly formasService:FormasService, private readonly organizacionesService: OrganizacionesService){}

    @Post()
    async createOrganizacion(@Body() body: { organizacionData: CreateOrganizacionDto, formaData: CreateFormaDto, user: UsuarioDto }){ // @Body() createOrganizacionDto: CreateOrganizacionDto
        console.log('BODY DE CREATE ORGANIZACION -> ', body)
        const { organizacionData, formaData, user } = body;
        organizacionData.usuarios = [user]
        //organizacionData.forma = formaData

        // crea forma
        const nuevaForma = await this.formasService.createForma(formaData)
        const nuevaFormaId = nuevaForma._id

        // guarda objectId de forma recien creada
        organizacionData.forma = nuevaFormaId

        return this.organizacionesService.createOrganizacion(organizacionData)
    }

    @Get(':organizacionId')
    async getOrganizacionById(@Param('organizacionId') organizacionId: string){
        return await this.organizacionesService.getOrganizacionById(organizacionId)
    }

    // a diferencia del getByUserId normal es que no devuelve la lista de los usuarios
    @Get('/view/:userId')
    async getOrgagetOrganizacionesViewByUserId(@Param('userId') userId: string){
        return await this.organizacionesService.getOrganizacionesViewByUserId(userId)
    }

    @Get(':userId')
    async getOrganizacionesByUserId(@Param('userId') userId: string){
        return this.organizacionesService.getOrganizacionesByUserId(userId)
    }

    @Post('cargarUser/:userId/:userNombre/:organizacionId')
    async cargarUser(@Param('userId') userId: string, @Param('organizacionId') organizacionId: string, @Param('userNombre') userNombre: string){
        return this.organizacionesService.cargarUser(userId, userNombre, organizacionId)
    }

    @Get(':userId/pertenece_a/:organizacionId')
    async userPerteneceAOrganizacion(@Param('userId') userId: string, @Param('organizacionId') organizacionId: string): Promise<boolean>{
        return this.organizacionesService.userPerteneceAOrganizacion(userId, organizacionId)
    }

    @Get('nombre/:idOrganizacion')
    async nombreByIdOrganizacion(@Param('idOrganizacion') idOrganizacion: string){
        const nombre = this.organizacionesService.nombreByIdOrganizacion(idOrganizacion)
        return { nombre }
    }

    @Delete(':idOrganizacion/:idUsuario')
    async eliminarUsuario(@Param('idOrganizacion') idOrganizacion: string, @Param('idUsuario') idUsuario: string){
        return this.organizacionesService.eliminarUsuario(idOrganizacion, idUsuario)
    }

}