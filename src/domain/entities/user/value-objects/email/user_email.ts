import { ValidationException } from "@/domain/exceptions/validation_exception";

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
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

        return emailRegex.test(email);
    }
}