import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentSymptoms } from "./appointment_symptoms";

describe('ValueObjects - AppointmentSymptoms', () => {
    it('should be able to create with valid symptoms', () => {
        const valueObject = new AppointmentSymptoms('Headache, insomnia');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with empty symptoms', () => {
        const createValueObject = () => new AppointmentSymptoms('');

        expect(createValueObject).toThrowError(ValidationException);
    });
});