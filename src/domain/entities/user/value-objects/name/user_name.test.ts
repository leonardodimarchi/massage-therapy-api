import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserName } from "./user_name";

describe('ValueObjects - UserName', () => {
    it('should be able to create with a valid name', () => {
        const valueObject = new UserName('My valid name');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with less than 3 characters', () => {
        const createValueObject = () => new UserName('..');

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create with more than 1024 characters', () => {
        const createValueObject = () => new UserName('.'.repeat(1024));

        expect(createValueObject).toThrowError(ValidationException);
    });
});