import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserPhone } from "./user_phone";

describe('ValueObjects - UserPhone', () => {
    it('should be able to create with a valid phone number', () => {
        const valueObject = new UserPhone('15991248723');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an invalid phone number', () => {
        const createValueObject = () => new UserPhone('');

        expect(createValueObject).toThrowError(ValidationException);
    });
});