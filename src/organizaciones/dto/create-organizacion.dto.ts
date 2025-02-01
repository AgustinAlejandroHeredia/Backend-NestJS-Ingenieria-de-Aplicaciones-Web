import { IsString, IsNumber, IsNotEmpty, IsDate, IsMongoId} from "class-validator";
import { Forma } from "src/schemas/Forma.schema";
import { UsuarioDto } from "./usuario.dto";
import { CreateFormaDto } from "src/formas/dto/create-forma.dto";
import { Types } from "mongoose";

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

    @IsNotEmpty()
    usuarios?:UsuarioDto[];

    @IsMongoId()
    forma: Types.ObjectId

}