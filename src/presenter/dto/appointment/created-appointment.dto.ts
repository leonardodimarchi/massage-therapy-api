import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseOutputDto } from "../base/base-output.dto";

export class CreatedAppointmentDto extends BaseOutputDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    complaint: string;

    @ApiPropertyOptional()
    isUnderMedicalTreatment?: boolean;

    @ApiProperty()
    symptoms: string;

    @ApiProperty()
    startsAt: Date;

    @ApiProperty()
    endsAt: Date;

    @ApiPropertyOptional()
    isPregnant?: boolean;

    @ApiPropertyOptional()
    pregnantWeeks?: number;
}