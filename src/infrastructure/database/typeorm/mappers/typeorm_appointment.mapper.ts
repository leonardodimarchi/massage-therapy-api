import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "@/domain/entities/appointment/value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/symptoms/appointment_symptoms";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";

interface TypeOrmRawAppointment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;
    status: AppointmentStatusEnum;
    userId: number;
}

export class TypeOrmAppointmentMapper {
    static toSchema(appointment: AppointmentEntity): TypeOrmRawAppointment {
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

    static toDomain(raw: TypeOrmRawAppointment): AppointmentEntity {
        const startsAt = raw.startsAt;
        const endsAt = raw.endsAt;

        return new AppointmentEntity({
            complaint: new AppointmentComplaint(raw.complaint),
            dateRange: new AppointmentDateRange({ startsAt, endsAt }),
            isUnderMedicalTreatment: raw.isUnderMedicalTreatment,
            status: raw.status,
            symptoms: new AppointmentSymptoms(raw.symptoms),
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