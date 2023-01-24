import { ValidationException } from "@/domain/exceptions/validation_exception";
import { PostalCode } from "./postal_code";

describe('ValueObjects - PostalCode', () => {
    it('should be able to create with a valid value', () => {
        const valueObject = new PostalCode('28874639');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with more than 8 characters', () => {
        const createValueObject = () => new PostalCode('288746390000');

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create with less than 8 characters', () => {
        const createValueObject = () => new PostalCode('.');

        expect(createValueObject).toThrowError(ValidationException);
    });
});