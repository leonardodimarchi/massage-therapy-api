import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export class CreateAppointmentUsecase implements UseCase<AppointmentEntity, AppointmentPayload> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) {}

    public async call(params: AppointmentPayload): Promise<AppointmentEntity> {
        return await this.repository.create(params);
    }
}