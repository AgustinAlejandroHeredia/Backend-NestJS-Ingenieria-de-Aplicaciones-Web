import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFormaDto } from './dto/create-forma.dto';
import { FormasService } from './formas.service';

@Controller('formas')
export class FormasController {

    constructor(private formasService: FormasService){}

    @Post()
    async createForma(@Body() createFormaDto: CreateFormaDto){
        return this.formasService.createForma(createFormaDto)
    }

    @Get(':formaId')
    async getFormaById(@Param('formaId') formaId: string){
        return this.formasService.getFormaById(formaId)
    }

}
