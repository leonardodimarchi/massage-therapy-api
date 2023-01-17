import { AppointmentStatusEnum } from "@/domain/entities/appointment/enum/appointment_status.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseEntityViewModel } from "../shared/base-entity.view-model";

export class AppointmentViewModel extends BaseEntityViewModel {
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

    @ApiProperty()
    status: AppointmentStatusEnum;
}