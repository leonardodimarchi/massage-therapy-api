import { ValidationException } from "@/domain/exceptions/validation_exception";

export class UserBirthdate {
    constructor(value: Date) {
        const hasMinimumAge = this.validateMinimumAge(value);

        if (!hasMinimumAge)
            throw new ValidationException('A idade mínima é de 10 anos.');

        this.birthdate = value;
    }

    private readonly birthdate: Date;

    get value(): Date {
        return this.birthdate;
    }

    private validateMinimumAge(value: Date): boolean {
        const today = new Date();
        const minimumAge = 10;
        const tenYearsBackDate = new Date(today.getDate(), today.getMonth(), today.getFullYear() - minimumAge);

        return tenYearsBackDate.getTime() >= value.getTime();
    }
}