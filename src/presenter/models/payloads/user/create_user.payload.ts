import { UserGenderEnum } from "@/domain/entities/user/enum/user_gender.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsDefined, IsEnum, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressPayload } from "../address/create_address.payload";

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

    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar um endereço' })
    @IsNotEmptyObject({}, { message: 'O endereço está em um formato inválido.' })
    @ValidateNested()
    @Type(() => CreateAddressPayload)
    address: CreateAddressPayload;
}