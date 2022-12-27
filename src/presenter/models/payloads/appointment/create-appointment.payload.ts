import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsString, IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateAppointmentPayload {
    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar uma descrição válida' })
    complaint: string;

    @ApiPropertyOptional({
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Deve ser indicado corretamente se está sobre tratamento médico' })
    isUnderMedicalTreatment?: boolean;

    @ApiProperty({
        required: true,
    })
    @IsString({ message: 'É necessário enviar os sintomas' })
    symptoms: string;

    @ApiProperty({
        required: true,
    })
    @IsDateString({}, { message: 'É necessário enviar uma data de início válida' })
    startsAt: string;

    @ApiProperty({
        required: true,
    })
    @IsDateString({}, { message: 'É necessário enviar uma data de fim válida' })
    endsAt: string;

    @ApiPropertyOptional({
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'Deve ser indicado corretamente se está sobre processo de gravidez' })
    isPregnant?: boolean;

    @ApiPropertyOptional({
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Deve ser indicado corretamente a quantidade de semanas de gestação' })
    pregnantWeeks?: number;
}