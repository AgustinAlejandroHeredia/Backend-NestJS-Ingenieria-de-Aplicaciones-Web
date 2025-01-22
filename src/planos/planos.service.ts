import { HttpException, Injectable } from '@nestjs/common';

// DTOs
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

// MONGOOSE
import { Model } from 'mongoose';

// SHCEMAS
import { Plano } from 'src/schemas/Plano.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Proyecto } from 'src/schemas/Proyecto.schema';


@Injectable()
export class PlanosService {

  // parte de conectar con DB
  constructor(
    @InjectModel(Plano.name) private planoModel: Model<Plano>,
    @InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>, // como se trata con planos pertenecientes a un proyecto, se trae el modelo proyecto
  ){}


  async createPlano({ proyectoid, ...createPlanoDto }: CreatePlanoDto) { // proyectoid esta declarado en el dto de plano
    const proyecto = await this.proyectoModel.findById(proyectoid)
    if(!proyecto){
      throw new HttpException('Proyecto no encontrado', 404)
    }
    const nuevoPlano = new this.planoModel(createPlanoDto); // crea el plano

    const planoCreado = nuevoPlano.save()
    await proyecto.updateOne({ // lo guarda y lo mete en el array de IDs de planos que hay en proyectos
      $push: {
        planos: (await planoCreado)._id
      }
  })
  return nuevoPlano // retorna el nuevo plano creado
  }

  getPlanos() {
    return this.planoModel.find()
  }

  getPlanoById(id: string) {
    return this.planoModel.findById(id)
  }

  updatePlano(id: string, updatePlanoDto: UpdatePlanoDto) {
    return this.planoModel.findByIdAndUpdate(id, updatePlanoDto)
  }

  deletePlano(id: string) {
    return this.planoModel.findByIdAndDelete(id)
  }
}
