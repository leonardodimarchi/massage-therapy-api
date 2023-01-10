import { ValidationException } from "@/domain/exceptions/validation_exception";
import { Validators } from "@/helpers/validations/email.validation";

export class UserEmail {
    constructor(email: string) {
        const isValid = this.validate(email);

        if (!isValid)
            throw new ValidationException('Email inválido.');

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