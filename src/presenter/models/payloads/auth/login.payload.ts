import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginPayload {
    @ApiProperty({
        required: true,
    })
    @IsEmail({ message: 'É necessário enviar um e-mail válido' })
    email: string;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar uma senha válida' })
    password: string;
}