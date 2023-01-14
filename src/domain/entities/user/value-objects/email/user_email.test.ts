import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserEmail } from "./user_email";

describe('ValueObjects - UserEmail', () => {
    it('should be able to create with a valid email', () => {
        const valueObject = new UserEmail('testing@email.com');

        expect(valueObject).toBeDefined();
    });

    it('should be able to create with a valid email with more extensions', () => {
        const valueObject = new UserEmail('testing@email.org.com.br');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with an invalid email', () => {
        const createValueObject = () => new UserEmail('testingemail.com');

        expect(createValueObject).toThrowError(ValidationException);
    });
});