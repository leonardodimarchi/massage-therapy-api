import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class PostalCode {
    constructor(postalCode: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(postalCode);

            if (!isValid)
                throw new ValidationException('Código postal inválido.');
        }

        this.postalCode = postalCode;
    }

    private readonly postalCode: string;

    get value(): string {
        return this.postalCode;
    }

    private validate(postalCode: string): boolean {
        return postalCode.trim().length === 8;
    }
}