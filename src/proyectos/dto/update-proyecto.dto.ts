import { PartialType } from '@nestjs/swagger';
import { CreateProyectoDto } from './create-proyecto.dto';
import { UsuarioDto } from "./usuario.dto";

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {

    // por ahora todos los campos

    _id?: string;
    nombre:string;
    expediente?:string;
    obra?:string;
    destino?:string;
    ubicacion?:string;
    escala?:string;
    otros?:string;
    referencias?:string;
    antecedentes?:string;
    propietario:string;
    proyectistas:string;
    direccion_tecnica?:string;
    estado?:string;
    usuarios?:UsuarioDto[]

    // por ahora no se añaden los plano aca

}
