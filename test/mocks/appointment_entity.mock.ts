import { AppointmentEntity } from "@/domain/entities/appointment_entity";

export const mockedAppointmentEntity = new AppointmentEntity({
    id: 1,
    createdAt: new Date(2023, 7, 20),
    updatedAt: new Date(2023, 7, 20),
    userId: 2,
    complaint: '',
    isUnderMedicalTreatment: false,
    symptoms: '',
    startsAt: new Date(2023, 7, 20),
    endsAt: new Date(2023, 8, 4)
});