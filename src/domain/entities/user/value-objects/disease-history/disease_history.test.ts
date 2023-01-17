import { ValidationException } from "@/domain/exceptions/validation_exception";
import { UserDiseaseHistory } from "./disease_history";

describe('ValueObjects - UserDiseaseHistory', () => {
    it('should be able to create with a valid name', () => {
        const valueObject = new UserDiseaseHistory('Valid disease');

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create with less than 3 characters', () => {
        const createValueObject = () => new UserDiseaseHistory('..');

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should not be able to create with more than 1024 characters', () => {
        const createValueObject = () => new UserDiseaseHistory('.'.repeat(1024));

        expect(createValueObject).toThrowError(ValidationException);
    });
});