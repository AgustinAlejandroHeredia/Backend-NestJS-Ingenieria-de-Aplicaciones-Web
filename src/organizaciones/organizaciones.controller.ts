import { BadRequestException, Body, Controller, Delete, Get, Header, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { userInfo } from 'os';
import { ViewOrganizacionDto } from './dto/view-organizacion.dto';

@Controller('organizaciones')
export class OrganizacionesController {

    constructor(private readonly organizacionesService: OrganizacionesService){}

    @Post()
    async createOrganizacion(@Body() createOrganizacionDto: CreateOrganizacionDto){
        return this.organizacionesService.createOrganizacion(createOrganizacionDto)
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

    @Post('cargarUser/:userId/:organizacionId')
    async cargarUser(@Param('userId') userId: string, @Param('organizacionId') organizacionId: string){
        return this.organizacionesService.cargarUser(userId, organizacionId)
    }

}