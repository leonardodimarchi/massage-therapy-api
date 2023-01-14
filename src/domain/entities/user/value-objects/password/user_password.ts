import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";
import { Validators } from "@/helpers/validators";

export class UserPassword {
    constructor(value: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(value);

            if (!isValid)
                throw new ValidationException('A senha deve possuir entre 6 e 512 caracteres.');
        }

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