import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class UserPhone {
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
                throw new ValidationException('Telefone inválido.');
        }

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