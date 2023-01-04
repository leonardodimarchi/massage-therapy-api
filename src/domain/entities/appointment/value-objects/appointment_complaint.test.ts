import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentComplaint } from "./appointment_complaint";

describe('ValueObjects - AppointmentComplaint', () => {
    it('should be able to create with a valid complaint', () => {
        const valueObject = new AppointmentComplaint('A valid complaint');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an empty complaint', () => {
        const createValueObject = () => new AppointmentComplaint('');

        expect(createValueObject).toThrowError(ValidationException);
    });
});