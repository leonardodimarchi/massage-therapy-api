import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentViewModel } from "./appointment.view-model";

export class AppointmentViewModelMapper {
    static toModel(entity: AppointmentEntity): AppointmentViewModel {
        const { startsAt, endsAt } = entity.dateRange.value;

        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            userId: entity.userId,
            complaint: entity.complaint.value,
            isUnderMedicalTreatment: entity.isUnderMedicalTreatment,
            symptoms: entity.symptoms.value,
            startsAt,
            endsAt,
            status: entity.status,
            isPregnant: entity.isPregnant,
            pregnantWeeks: entity.pregnantWeeks,
        };
    }
}