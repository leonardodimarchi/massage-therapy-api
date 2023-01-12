import { ValidationException } from "@/domain/exceptions/validation_exception";
import { TestDateUtils } from "test/utils/test_date_utils";
import { UserBirthdate } from "./user_birthdate";

describe('ValueObjects - UserBirthdate', () => {
    beforeAll(() => {
        TestDateUtils.setTestDate(new Date());
    });

    afterAll(() => {
        TestDateUtils.resetTestDate();
    })

    it('should be able to create with a valid birthdate', () => {
        const age = 18;
        const birthDate = new Date(new Date().getDate(), new Date().getMonth(), new Date().getFullYear() - age);
        const valueObject = new UserBirthdate(birthDate);

        expect(valueObject).toBeDefined();
    });

    it('should not be able to create less than 10 years old birthdate', () => {
        const age = 9;
        const birthDate = new Date(new Date().getDate(), new Date().getMonth(), new Date().getFullYear() - age);

        const createValueObject = () => new UserBirthdate(birthDate);

        expect(createValueObject).toThrowError(ValidationException);
    });

    it('should be able to create if has exactly 10 years old', () => {
        const age = 10;
        const birthDate = new Date(new Date().getDate(), new Date().getMonth(), new Date().getFullYear() - age);

        const createValueObject = () => new UserBirthdate(birthDate);

        expect(createValueObject).toThrowError(ValidationException);
    });
});