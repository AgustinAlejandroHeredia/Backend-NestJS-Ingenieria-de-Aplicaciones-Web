import { IsString, IsNumber, IsNotEmpty, IsDate} from "class-validator";
import { buffer } from "stream/consumers";

export class CreateArchivoDto {

    @IsString()
    @IsNotEmpty()
    filename:string;

    @IsString()
    @IsNotEmpty()
    encoding: string

    @IsString()
    @IsNotEmpty()
    mimetype: string

    @IsNotEmpty()
    buffer: Buffer

    @IsNumber()
    @IsNotEmpty()
    size: number

    @IsString()
    @IsNotEmpty()
    tipo: string

    @IsString()
    @IsNotEmpty()
    subido_por: string

    @IsNumber()
    @IsNotEmpty()
    fecha_creacion: number

}