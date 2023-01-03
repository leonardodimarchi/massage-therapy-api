import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/appointment_complaint";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/appointment_symptoms";
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

        const entity = this.getEntity(params);

        const createdAppointment = await this.repository.create(entity);

        return {
            createdAppointment,
        };
    }

    private getEntity({
        userId,
        complaint,
        isUnderMedicalTreatment,
        symptoms,
        startsAt,
        endsAt,
        isPregnant,
        pregnantWeeks,
    }: CreateAppointmentUsecaseInput): AppointmentEntity {
        return new AppointmentEntity({
            userId,
            complaint: new AppointmentComplaint(complaint),
            isUnderMedicalTreatment,
            symptoms: new AppointmentSymptoms(symptoms),
            startsAt,
            endsAt,
            isPregnant,
            pregnantWeeks,
            status: AppointmentStatusEnum.PENDING,
        })
    }
}