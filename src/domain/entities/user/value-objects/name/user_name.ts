import { ValidationException } from "@/domain/exceptions/validation_exception";

export class UserName {
    constructor(value: string) {
        const hasValidLength = this.validate(value);

        if (!hasValidLength)
            throw new ValidationException('O nome de usuário deve conter entre 3 e 1024 caracteres.');

        this.name = value;
    }

    private readonly name: string;

    get value(): string {
        return this.name;
    }

    private validate(value: string): boolean {
        return value.trim().length > 3 && value.trim().length < 1024;
    }
}