import { Injectable, Logger } from '@nestjs/common';

// DTOs
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

// MONGOOSE
import { Model } from 'mongoose';

// SCHEMAS
import { Proyecto } from 'src/schemas/Proyecto.schema';
import { InjectModel } from '@nestjs/mongoose';

// BACKBLAZE
import BackBlazeB2 from 'backblaze-b2';
const B2 = require('backblaze-b2')

@Injectable()
export class ProyectosService {

  private b2: BackBlazeB2
  private readonly logger = new Logger()

  // parte de conectar con DB
  constructor(@InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>){
    this.b2 = new B2({
      applicationKeyId: '0052d9ef99435720000000003',
      applicationKey: 'K005/7rr7ZSKuuPiaKPQcdv8azucI3M'
  })
  }


  async createProyecto(createProyectoDto: CreateProyectoDto) {
    const nuevoProyecto = new this.proyectoModel(createProyectoDto);
    return await nuevoProyecto.save()
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

  async cargarUser(userId: string, nombreUsuario: string, proyectoId: string) {
    const usuario = { id: userId, nombre: nombreUsuario };

    return this.proyectoModel.findByIdAndUpdate(
        proyectoId,
        { $push: { usuarios: usuario } },
        { new: true }
    ).exec();
  }

  deleteProyecto(id: string) {
    return this.proyectoModel.findByIdAndDelete(id)
  }

  getProyectosByUserIdAndOrganizacionId(userId: string, organizacionId: string): Promise<Proyecto[]> {
    return this.proyectoModel.find({
      'usuarios.id': userId,
      'id_organizacion': organizacionId,
    }).exec();
  }

  getPlanosByProjectID(idProyecto: string) {
    return this.proyectoModel
      .findById(idProyecto)
      .populate('planos')
      .select('planos')
      .exec();
  }

  async eliminarUsuarioDelProyecto(proyectoId: string, userId: string): Promise<boolean> {
    const proyecto = await this.proyectoModel.findByIdAndUpdate(
      proyectoId,
      { $pull: { usuarios: { id: userId } } },
      { new: true }
    ).exec();

    return proyecto ? true : false;
  }
}
