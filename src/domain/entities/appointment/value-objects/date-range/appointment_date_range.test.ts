import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentDateRange } from "./appointment_date_range";

describe('ValueObjects - AppointmentDateRange', () => {
    it('should be able to create with valid dates', () => {
        const valueObject = new AppointmentDateRange({
            startsAt: new Date(2024, 4, 10, 8, 30),
            endsAt: new Date(2024, 4, 10, 9, 40),
        });

        expect(valueObject).toBeDefined();
    });

    it('should not be able create if days are different', async () => {
        const startsAt = new Date(2022, 10, 2);
        const endsAt = new Date(2022, 11, 3);

        const createValueObject = () => new AppointmentDateRange({ startsAt, endsAt });

        expect(createValueObject).toThrowError(ValidationException);
    });
});