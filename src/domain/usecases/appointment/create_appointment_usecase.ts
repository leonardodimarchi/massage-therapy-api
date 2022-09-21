import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentPayload } from "@/domain/models/payloads/appointment_payload";
import { AppointmentProxy } from "@/domain/models/proxies/appointment_proxy";

export class CreateAppointmentUsecase implements UseCase<AppointmentPayload, AppointmentProxy> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call(params: AppointmentPayload): Promise<AppointmentProxy> {
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

        const entity = await this.repository.create(params);

        return new AppointmentProxy({...entity});
    }
}