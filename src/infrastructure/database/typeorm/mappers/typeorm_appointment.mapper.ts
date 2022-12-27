import { AppointmentEntity } from "@/domain/entities/appointment_entity";

export class TypeOrmAppointmentMapper {
    static toSchema(appointment: AppointmentEntity) {
        return {
            complaint: appointment.complaint,
            createdAt: appointment.createdAt,
            endsAt: appointment.endsAt,
            id: appointment.id,
            isPregnant: appointment.isPregnant,
            isUnderMedicalTreatment: appointment.isUnderMedicalTreatment,
            pregnantWeeks: appointment.pregnantWeeks,
            startsAt: appointment.startsAt,
            status: appointment.status,
            symptoms: appointment.symptoms,
            updatedAt: appointment.updatedAt,
            userId: appointment.userId,
        };
    }

    static toDomain(raw: any): AppointmentEntity {
        return new AppointmentEntity({
            complaint: raw.complaint,
            endsAt: raw.endsAt,
            isUnderMedicalTreatment: raw.isUnderMedicalTreatment,
            startsAt: raw.startsAt,
            status: raw.status,
            symptoms: raw.symptoms,
            userId: raw.userId,
            isPregnant: raw.isPregnant,
            pregnantWeeks: raw.pregnantWeeks,
        }, {
            id: raw.id,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        })
    }
}