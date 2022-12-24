import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateUserPayload {
    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar um e-mail válido' })
    email: string;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar um nome válido' })
    name: string;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar um telefone válido' })
    phone: string;

    @ApiProperty({
        required: true,
    })
    @IsDateString({}, { message: 'É necessário enviar uma data de nascimento válida' })
    birthDate: Date;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar uma senha válida' })
    password: string;
}