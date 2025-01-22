import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import mongoose from 'mongoose';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  // CHECKED WITH SWAGGER
  @Post()
  createProyecto(@Body() createProyectoDto: CreateProyectoDto) {
    console.log(createProyectoDto)
    return this.proyectosService.createProyecto(createProyectoDto);
  }

  // CHECKED WITH SWAGGER
  @Get()
  getProyectos() {
    return this.proyectosService.getProyectos();
  }

  // CHECKED WITH SWAGGER
  // TEST: buscar la id de un proyecto listado, copiarla e introducirla en /proyectos/{id}
  @Get(':id') // parametro que recibe en este endpoint
  async getProyectoById(@Param('id') id: string) { // se identifica este parametro

    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
      throw new HttpException('id no valido', 404)
    }

    // busca el proyecto en la DB
    const proyecto = await this.proyectosService.getProyectoById(id)
    if(!proyecto){
      throw new HttpException('Proyecto no encontrado', 404)
    }

    return proyecto
  }

  // CHECKED WITH SWAGGER
  @Patch(':id') // patch se usa para hacer un update de lagunas partes de un registro en particular
  updateProyecto(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {

    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
      throw new HttpException('id no valido', 404)
    }

    return this.proyectosService.updateProyecto(id, updateProyectoDto)
  }

  // CHECKED WITH SWAGGER
  @Delete(':id')
  async deleteProyecto(@Param('id') id: string) {

    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
      throw new HttpException('id no valido', 404)
    }

    const deletedProyecto = await this.proyectosService.deleteProyecto(id)
    
    if(!deletedProyecto){
      throw new HttpException('Proyecto no encontrado', 404)
    }

    return deletedProyecto
  }

  // CHECKED WITH SWAGGER
  @Get('user/:userId')
  async getProyectosByUserId(@Param('userId') userId: string) {
    const proyectos = await this.proyectosService.getProyectosByUserId(userId)
    if(!proyectos){
      throw new HttpException('No se encontraron proyectos para un usuario con esa id', 404)
    }
    console.log('PROYECTOS',proyectos)
    return proyectos
  }

  @Get('planos/:idProyecto')
  async getPlanosByProjectID(@Param('idProyecto') idProyecto: string){
    const proyecto = await this.proyectosService.getPlanosByProjectID(idProyecto)
    if(!proyecto){
      throw new HttpException('No se encontraron planos en este proyecto', 404)
    }
    const planos = proyecto.planos
    console.log('PLANOS',planos)
    return planos
  }
}
