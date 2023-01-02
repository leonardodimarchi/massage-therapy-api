import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { UserEntity } from "@/domain/entities/user_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { PaginationOptions } from "@/domain/models/interfaces/pagination_options.interface";

export abstract class AppointmentRepository {
    abstract create(appointment: AppointmentEntity): Promise<AppointmentEntity>;
    abstract hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean>;
    abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>>;
}

export type GetUserAppointmentsParams = {
    user: UserEntity;
    paginationOptions?: PaginationOptions;
}