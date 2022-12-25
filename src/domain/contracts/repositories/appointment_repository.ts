import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { UserEntity } from "@/domain/entities/user_entity";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";

export abstract class AppointmentRepository {
    abstract create(params: {
        userId: number;
        complaint: string;
        isUnderMedicalTreatment: boolean;
        symptoms: string;
        startsAt: Date;
        endsAt: Date;
        isPregnant?: boolean;
        pregnantWeeks?: number;
        status?: AppointmentStatusEnum,
    }): Promise<AppointmentEntity>;
    abstract hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean>;
    abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>>;
}

export type GetUserAppointmentsParams = {
    user: UserEntity;
    paginationOptions?: PaginationOptions;
}