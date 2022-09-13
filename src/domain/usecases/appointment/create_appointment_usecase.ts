import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export class CreateAppointmentUsecase implements UseCase<AppointmentEntity, AppointmentPayload> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call(params: AppointmentPayload): Promise<AppointmentEntity> {
        if (params.startsAt.getTime() < new Date().getTime())
            throw new ValidationException('A data de agendamento não pode ser antes da data de hoje');

        if (params.endsAt.getTime() < params.startsAt.getTime())
            throw new ValidationException('A data final do agendamento não pode ser antes da data inicial');

        return await this.repository.create(params);
    }
}