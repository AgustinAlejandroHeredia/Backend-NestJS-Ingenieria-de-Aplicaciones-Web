import { IsString, IsNumber, IsNotEmpty, IsDate} from "class-validator";
import { buffer } from "stream/consumers";

export class CreatePlanoDto {

/* Originalmente para almacenar el archivo en mongo

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

    @IsNumber()
    @IsNotEmpty()
    fecha_creacion: number

*/

// para backblaze

    @IsString()
    @IsNotEmpty()
    filename: string

    @IsString()
    @IsNotEmpty()
    tipo: string

    @IsString()
    @IsNotEmpty()
    subido_por: string

    @IsNumber()
    @IsNotEmpty()
    fecha_creacion: number

    @IsNumber()
    @IsNotEmpty()
    size: number

    @IsString()
    @IsNotEmpty()
    type: string

}