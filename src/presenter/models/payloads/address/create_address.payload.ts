import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,  } from "class-validator";

export class CreateAddressPayload {
    @ApiProperty()
    @IsString({ message: 'É necessário enviar um estado válido' })
    state: string;

    @ApiProperty()
    @IsString({ message: 'É necessário enviar uma cidade válida' })
    city: string;

    @ApiProperty()
    @IsString({ message: 'É necessário enviar uma rua válida' })
    street: string;

    @ApiProperty()
    @IsString({ message: 'É necessário enviar um bairro válido' })
    neighborhood: string;

    @ApiProperty()
    @IsString({ message: 'É necessário enviar um código postal válido' })
    postalCode: string;

    @ApiProperty()
    @IsNumber({}, { message: 'É necessário enviar um número de endereço válido' })
    houseNumber: number;
}