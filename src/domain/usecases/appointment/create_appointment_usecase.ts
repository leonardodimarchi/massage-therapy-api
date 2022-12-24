import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";

export interface CreateAppointmentUsecaseInput {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;
}

export interface CreateAppointmentUsecaseOutput {
    createdAppointment: AppointmentEntity;
}

export class CreateAppointmentUsecase implements UseCase<CreateAppointmentUsecaseInput, CreateAppointmentUsecaseOutput> {

    constructor(
        private readonly repository: AppointmentRepository,
    ) { }

    public async call(params: CreateAppointmentUsecaseInput): Promise<CreateAppointmentUsecaseOutput> {
        if (!params.complaint?.trim()?.length)
            throw new ValidationException('É necessário enviar uma descrição');

        if (!params.symptoms?.trim()?.length)
            throw new ValidationException('É necessário enviar algum sintoma');

        if (params.startsAt?.getTime() < new Date().getTime())
            throw new ValidationException('A data de agendamento não pode ser antes da data de hoje');

        if (params.startsAt?.getTime() === params.endsAt?.getTime())
            throw new ValidationException('A data inicial não deve ser igual a data final do agendamento');

        if (params.endsAt?.getTime() < params.startsAt?.getTime())
            throw new ValidationException('A data final do agendamento não pode ser antes da data inicial');

        if (params.startsAt?.getDate() !== params.endsAt?.getDate())
            throw new ValidationException('A data inicial e final do agendamento não podem ser em dias diferentes');

        const hasConflictingDates = await this.repository.hasConflictingDates(params.startsAt, params.endsAt);

        if (hasConflictingDates)
            throw new ValidationException('A data de agendamento está indisponível');

        const createdAppointment = await this.repository.create({
            ...params,
            status: AppointmentStatusEnum.PENDING,
        });

        return { 
            createdAppointment,
         };
    }
}