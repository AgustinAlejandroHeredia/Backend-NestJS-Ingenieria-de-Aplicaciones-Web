import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Forma } from 'src/schemas/Forma.schema';
import { CreateFormaDto } from './dto/create-forma.dto';

@Injectable()
export class FormasService {

    constructor(
        @InjectModel(Forma.name) private formaModel: Model<Forma>,
    ){}

    async createForma(createFormaDto: CreateFormaDto){
        const nuevaForma = new this.formaModel(createFormaDto)
        return nuevaForma.save()
    }

    async getFormaById(formaId: string){
        return this.formaModel.findById(formaId).exec()
    }

}
