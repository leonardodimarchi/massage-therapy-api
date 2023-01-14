import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserPassword } from "./user_password";

describe('ValueObjects - UserPassword', () => {
    it('should be able to create with a valid password', () => {
        const valueObject = new UserPassword('123456');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with a password with less than 6 characters', () => {
        const createValueObject = () => new UserPassword('12345');

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create with a password with more than 512 characters', () => {
        const createValueObject = () => new UserPassword('.'.repeat(513));

        expect(createValueObject).toThrowError(ValidationException);
    });
});