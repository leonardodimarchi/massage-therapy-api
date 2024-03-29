import { AppointmentRepository } from "@/domain/contracts/repositories/appointment_repository";
import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "@/domain/entities/appointment/value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/symptoms/appointment_symptoms";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentStatusEnum } from "@/domain/entities/appointment/enum/appointment_status.enum";

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
            dateRange: new AppointmentDateRange({ startsAt, endsAt }),
            isPregnant,
            pregnantWeeks,
            status: AppointmentStatusEnum.PENDING,
        })
    }
}