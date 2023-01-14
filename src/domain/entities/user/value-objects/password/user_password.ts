import { ValidationException } from "@/domain/exceptions/validation_exception";
import { Validators } from "@/helpers/validators";

export class UserPassword {
    constructor(value: string) {
        const isValid = this.validate(value);

        if (!isValid)
            throw new ValidationException('A senha deve possuir entre 6 e 512 caracteres.');

        this.password = value;
    }

    private readonly password: string;

    get value(): string {
        return this.password;
    }

    private validate(value: string): boolean {
        return Validators.isValidPassword(value);
    }
}