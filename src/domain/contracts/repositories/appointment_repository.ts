import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export abstract class AppointmentRepository {
    abstract create(params: AppointmentPayload): Promise<AppointmentEntity>;
}