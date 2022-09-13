import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export abstract class AppointmentDatasource {
    abstract create(params: AppointmentPayload): Promise<AppointmentEntity>;
    abstract hasConflictingDates(startDate: Date, endDate: Date): Promise<boolean>;
}