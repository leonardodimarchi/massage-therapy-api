import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar um e-mail válido' })
    email: string;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar uma senha válida' })
    password: string;
}