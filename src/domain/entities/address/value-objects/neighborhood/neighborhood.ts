import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class Neighborhood {
    constructor(neighborhood: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(neighborhood);

            if (!isValid)
                throw new ValidationException('Bairro inválido.');
        }

        this.neighborhood = neighborhood;
    }

    private readonly neighborhood: string;

    get value(): string {
        return this.neighborhood;
    }

    private validate(city: string): boolean {
        return !!city.trim().length;
    }
}