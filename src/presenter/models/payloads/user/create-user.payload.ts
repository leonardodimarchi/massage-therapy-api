import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

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
    birthDate: string;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar uma senha válida' })
    password: string;

    @ApiProperty({
        required: true,
    })
    @IsEnum(UserGenderEnum, { message: 'É necessário enviar um gênero valido' })
    gender: UserGenderEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'É necessário enviar um histórico válido de doenças, lesões e cirurgias' })
    diseaseHistory?: string;
}