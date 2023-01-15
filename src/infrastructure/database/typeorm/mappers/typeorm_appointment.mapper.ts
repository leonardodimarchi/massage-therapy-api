import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "@/domain/entities/appointment/value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/symptoms/appointment_symptoms";
import { RawAppointmentEntity } from "../schema/appointment_schema";

export class TypeOrmAppointmentMapper {
    static toSchema(appointment: AppointmentEntity): RawAppointmentEntity {
        const { startsAt, endsAt } = appointment.dateRange.value;

        return {
            complaint: appointment.complaint.value,
            createdAt: appointment.createdAt,
            id: appointment.id,
            isPregnant: appointment.isPregnant,
            isUnderMedicalTreatment: appointment.isUnderMedicalTreatment,
            pregnantWeeks: appointment.pregnantWeeks,
            startsAt,
            endsAt,
            status: appointment.status,
            symptoms: appointment.symptoms.value,
            updatedAt: appointment.updatedAt,
            userId: appointment.userId,
        };
    }

    static toDomain(raw: RawAppointmentEntity): AppointmentEntity {
        const startsAt = raw.startsAt;
        const endsAt = raw.endsAt;

        return new AppointmentEntity({
            complaint: new AppointmentComplaint(raw.complaint, { validate: false }),
            dateRange: new AppointmentDateRange({ startsAt, endsAt }, { validate: false }),
            isUnderMedicalTreatment: raw.isUnderMedicalTreatment,
            status: raw.status,
            symptoms: new AppointmentSymptoms(raw.symptoms, { validate: false }),
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