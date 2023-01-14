import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";
import { Validators } from "@/helpers/validators";

export class UserEmail {
    constructor(email: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(email);

            if (!isValid)
                throw new ValidationException('Email inválido.');
        }

        this.email = email;
    }

    private readonly email: string;

    get value(): string {
        return this.email;
    }

    private validate(email: string): boolean {
        return Validators.isValidEmail(email);
    }
}