import { Injectable } from '@nestjs/common';

// DTOs
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

// MONGOOSE
import { Model } from 'mongoose';

// SCHEMAS
import { Proyecto } from 'src/schemas/Proyecto.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ProyectosService {

  // parte de conectar con DB
  constructor(@InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>){}


  createProyecto(createProyectoDto: CreateProyectoDto) {
    const nuevoProyecto = new this.proyectoModel(createProyectoDto);
    return nuevoProyecto.save()
  }

  getProyectos() {
    return this.proyectoModel.find()
  }

  getProyectoById(id: string) {
    return this.proyectoModel.findById(id)
  }

  updateProyecto(id: string, updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoModel.findByIdAndUpdate(id, updateProyectoDto)
  }

  deleteProyecto(id: string) {
    return this.proyectoModel.findByIdAndDelete(id)
  }

  getProyectosByUserId(userId: string) {
    return this.proyectoModel.find({usuarios: userId})
  }

  getPlanosByProjectID(idProyecto: string) {
    return this.proyectoModel
      .findById(idProyecto)
      .populate('planos')
      .select('planos')
      .exec();
  }
}
