import { AppointmentEntity } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/appointment_complaint";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/appointment_symptoms";
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
        return {
            complaint: appointment.complaint.value,
            createdAt: appointment.createdAt,
            endsAt: appointment.endsAt,
            id: appointment.id,
            isPregnant: appointment.isPregnant,
            isUnderMedicalTreatment: appointment.isUnderMedicalTreatment,
            pregnantWeeks: appointment.pregnantWeeks,
            startsAt: appointment.startsAt,
            status: appointment.status,
            symptoms: appointment.symptoms.value,
            updatedAt: appointment.updatedAt,
            userId: appointment.userId,
        };
    }

    static toDomain(raw: TypeOrmRawAppointment): AppointmentEntity {
        return new AppointmentEntity({
            complaint: new AppointmentComplaint(raw.complaint),
            endsAt: raw.endsAt,
            isUnderMedicalTreatment: raw.isUnderMedicalTreatment,
            startsAt: raw.startsAt,
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