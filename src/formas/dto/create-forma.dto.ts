import { IsString, IsNumber, IsNotEmpty} from "class-validator";

export class CreateFormaDto {

    @IsString()
    @IsNotEmpty()
    letra: string

    @IsNumber()
    @IsNotEmpty()
    numero: number

    @IsNumber()
    @IsNotEmpty()
    year: number

    @IsString()
    @IsNotEmpty()
    partida: string

}