import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { AppointmentViewModel } from "./appointment.view-model";

export class AppointmentViewModelMapper {
    static toModel(entity: AppointmentEntity): AppointmentViewModel {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            userId: entity.userId,
            complaint: entity.complaint,
            isUnderMedicalTreatment: entity.isUnderMedicalTreatment,
            symptoms: entity.symptoms,
            startsAt: entity.startsAt,
            endsAt: entity.endsAt,
            status: entity.status,
            isPregnant: entity.isPregnant,
            pregnantWeeks: entity.pregnantWeeks,
        };
    }
}