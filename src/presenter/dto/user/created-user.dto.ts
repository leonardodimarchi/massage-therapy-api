import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";
import { BaseOutputDto } from "../base/base-output.dto";

export class CreatedUserDto extends BaseOutputDto {
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
}