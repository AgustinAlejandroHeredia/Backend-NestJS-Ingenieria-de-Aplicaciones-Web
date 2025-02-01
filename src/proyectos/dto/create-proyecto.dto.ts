import { UsuarioDto } from "./usuario.dto";

export class CreateProyectoDto {
    
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
    usuarios?:UsuarioDto[];
    id_organizacion: string
}
