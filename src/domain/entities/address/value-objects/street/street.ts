import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class Street {
    constructor(street: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(street);

            if (!isValid)
                throw new ValidationException('Rua inválida.');
        }

        this.street = street;
    }

    private readonly street: string;

    get value(): string {
        return this.street;
    }

    private validate(street: string): boolean {
        return !!street.trim().length;
    }
}