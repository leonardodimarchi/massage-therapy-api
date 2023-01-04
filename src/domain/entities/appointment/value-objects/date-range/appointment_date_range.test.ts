import { ValidationException } from "@/domain/exceptions/validation_exception";
import { AppointmentDateRange, AppointmentDateRangeProps } from "./appointment_date_range";
import { set as setTestDate, reset as resetTestDate } from "mockdate";

describe('ValueObjects - AppointmentDateRange', () => {
    beforeAll(() => {
        setTestDate(new Date());
    });

    afterAll(() => {
        resetTestDate();
    });

    const ONE_MILLISECOND = 1;

    const createValidDates = (): AppointmentDateRangeProps => {
        const startsAt = new Date(new Date().getTime() + ONE_MILLISECOND);
        const endsAt = new Date(startsAt.getTime() + ONE_MILLISECOND);

        return {
            startsAt,
            endsAt,
        };
    }

    it('should be able to create with valid dates', () => {
        const valueObject = new AppointmentDateRange(createValidDates());

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create if days are different', async () => {
        const { startsAt, endsAt } = createValidDates();

        endsAt.setDate(startsAt.getDate() + ONE_MILLISECOND);

        const createValueObject = () => new AppointmentDateRange({ startsAt, endsAt });

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create if the end date is equal start date', async () => {
        const { startsAt, endsAt } = createValidDates();

        endsAt.setTime(startsAt.getTime());

        const createValueObject = () => new AppointmentDateRange({ startsAt, endsAt });

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create if the end date is before start date', async () => {
        const { startsAt, endsAt } = createValidDates();

        endsAt.setTime(startsAt.getTime() - ONE_MILLISECOND);

        const createValueObject = () => new AppointmentDateRange({ startsAt, endsAt });

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not create if the start date is before now', async () => {
        const { startsAt, endsAt } = createValidDates();

        startsAt.setTime(new Date().getTime() - ONE_MILLISECOND);

        const createValueObject = () => new AppointmentDateRange({ startsAt, endsAt });

        expect(createValueObject).toThrowError(ValidationException);
    });
});