import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class City {
    constructor(city: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(city);

            if (!isValid)
                throw new ValidationException('Cidade inválida.');
        }

        this.city = city;
    }

    private readonly city: string;

    get value(): string {
        return this.city;
    }

    private validate(city: string): boolean {
        return !!city.trim().length;
    }
}