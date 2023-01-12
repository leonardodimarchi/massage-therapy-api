import { ValidationException } from "@/domain/exceptions/validation_exception";

export class UserPhone {
    constructor(value: string) {
        const isValid = this.validate(value);

        if (!isValid)
            throw new ValidationException('Telefone inválido.');

        this.phone = value;
    }

    private readonly phone: string;

    get value(): string {
        return this.phone;
    }

    private validate(value: string): boolean {
        return !!value.trim().length;
    }
}