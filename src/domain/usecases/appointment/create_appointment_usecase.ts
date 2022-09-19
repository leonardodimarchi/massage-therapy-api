import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";

export class CreateAppointmentUsecase implements UseCase<AppointmentPayload, AppointmentEntity> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call(params: AppointmentPayload): Promise<AppointmentEntity> {
        if (!params.complaint?.trim()?.length)
            throw new ValidationException('É necessário enviar uma descrição');

        if (!params.symptoms?.trim()?.length)
            throw new ValidationException('É necessário enviar algum sintoma');

        if (params.startsAt?.getTime() < new Date().getTime())
            throw new ValidationException('A data de agendamento não pode ser antes da data de hoje');

        if (params.endsAt?.getTime() < params.startsAt?.getTime())
            throw new ValidationException('A data final do agendamento não pode ser antes da data inicial');

        const hasConflictingDates = await this.repository.hasConflictingDates(params.startsAt, params.endsAt);

        if (hasConflictingDates)
            throw new ValidationException('A data de agendamento está indisponível');

        return await this.repository.create(params);
    }
}