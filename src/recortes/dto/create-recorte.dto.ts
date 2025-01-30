import { IsString, IsNumber, IsNotEmpty, IsDate} from "class-validator";

export class CreateRecorteDto {

    @IsString()
    _id?: string

    @IsString()
    @IsNotEmpty()
    filename: string

    @IsString()
    @IsNotEmpty()
    subido_por: string

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsNumber()
    @IsNotEmpty()
    fecha_creacion: number

    @IsNumber()
    @IsNotEmpty()
    size: number

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    especialidad: string

    @IsString()
    @IsNotEmpty()
    etiquetas: string

    @IsString()
    @IsNotEmpty()
    id_plano_original_mongo: string

}