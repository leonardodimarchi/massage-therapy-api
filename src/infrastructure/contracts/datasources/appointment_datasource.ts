import { GetUserAppointmentsParams } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { PaginatedItems } from "@/domain/models/interfaces/paginated_items.interface";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export abstract class AppointmentDatasource {
    abstract create(params: AppointmentPayload): Promise<AppointmentEntity>;
    abstract hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean>;
    abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>>;
}