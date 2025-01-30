import { IsString, IsNumber, IsNotEmpty, IsDate} from "class-validator";

export class CreateOrganizacionAccessTokenDto {

    @IsString()
    @IsNotEmpty()
    organizacion_id: string

    @IsNumber()
    @IsNotEmpty()
    creacion: number

    @IsNumber()
    @IsNotEmpty()
    duracion: number

    @IsString()
    @IsNotEmpty()
    codigo: string

}