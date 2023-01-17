import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class UserDiseaseHistory {
    constructor(value: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const hasValidLength = this.validate(value);

            if (!hasValidLength)
                throw new ValidationException('O histórico de doenças/lesões/cirurgias deve conter entre 3 e 1024 caracteres.');
        }

        this.history = value;
    }

    private readonly history: string;

    get value(): string {
        return this.history;
    }

    private validate(value: string): boolean {
        return value.trim().length > 3 && value.trim().length < 1024;
    }
}