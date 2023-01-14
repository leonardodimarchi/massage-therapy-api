import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class UserBirthdate {
    constructor(value: Date, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const hasMinimumAge = this.validateMinimumAge(value);

            if (!hasMinimumAge)
                throw new ValidationException('A idade mínima é de 10 anos.');
        }

        this.birthdate = value;
    }

    private readonly birthdate: Date;

    get value(): Date {
        return this.birthdate;
    }

    private validateMinimumAge(value: Date): boolean {
        const today = new Date();
        const minimumAge = 10;
        const tenYearsBackDate = new Date(today.getFullYear() - minimumAge, today.getMonth(), today.getDate());

        return tenYearsBackDate.getTime() >= value.getTime();
    }
}