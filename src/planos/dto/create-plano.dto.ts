export class CreatePlanoDto {

    subido_por:string;

    nombre:string
    especialidad?:string

    // para la relacion one-to-many
    proyectoid: string

    // archivo

}
