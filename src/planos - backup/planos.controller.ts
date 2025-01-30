import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import mongoose from 'mongoose';

@Controller('planos')
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  @Post()
  createPlano(@Body() createPlanoDto: CreatePlanoDto) {
    console.log(createPlanoDto)
    return this.planosService.createPlano(createPlanoDto);
  }

  @Get()
  //@UseGuards(AuthorizationGuard)
  getPlanos() {
    return this.planosService.getPlanos();
  }

  @Get(':id')
  async getPlanoById(@Param('id') id: string) {
    
    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
      throw new HttpException('id no valido', 404)
    }

    // busca el plano en la DB
    const plano = await this.planosService.getPlanoById(id)
    if(!plano){
      throw new HttpException('Plano no encontrado', 404)
    }

    return plano
  }

  @Patch(':id')
  updatePlano(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    
    // revisa que la id sea valida para cast a ObjectID que usa MongoDB
    const valido = mongoose.Types.ObjectId.isValid(id)
    if(!valido){
      throw new HttpException('id no valido', 404)
    }

    return this.planosService.updatePlano(id, updatePlanoDto)
  }

  @Delete(':id')
  async deletePlano(@Param('id') id: string) {
    
     // revisa que la id sea valida para cast a ObjectID que usa MongoDB
     const valido = mongoose.Types.ObjectId.isValid(id)
     if(!valido){
       throw new HttpException('id no valido', 404)
     }

     const deletedPlano = await this.planosService.deletePlano(id)

     if(!deletedPlano){
      throw new HttpException('Plano no encontrado', 404)
    }

    return deletedPlano
  }
}
