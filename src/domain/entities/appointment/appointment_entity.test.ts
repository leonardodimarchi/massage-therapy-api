import { AppointmentEntity } from "./appointment_entity";
import { AppointmentComplaint } from "./value-objects/appointment_complaint";
import { AppointmentSymptoms } from "./value-objects/appointment_symptoms";

describe('AppointmentEntity', () => {
    it('should be able to instantiate the entity', () => {
        const entity = new AppointmentEntity({
            complaint: new AppointmentComplaint('Those two last weeks i have been felling a strong headache'),
            startsAt: new Date(2023, 7, 19, 5, 20),
            endsAt: new Date(2023, 7, 19, 6, 20),
            isUnderMedicalTreatment: false,
            symptoms: new AppointmentSymptoms('Headache, Sore throat'),
            userId: 5,
        })

        expect(entity).toBeDefined();
    });
});