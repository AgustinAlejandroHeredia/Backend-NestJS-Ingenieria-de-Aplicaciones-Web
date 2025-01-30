import { IsString, IsNumber, IsNotEmpty, IsDate} from "class-validator";
import { Forma } from "src/schemas/Forma.schema";

export class CreateOrganizacionDto {

    _id?: string

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    direccion: string

    @IsString()
    @IsNotEmpty()
    contactos: string

    @IsString()
    @IsNotEmpty()
    forma: string

}