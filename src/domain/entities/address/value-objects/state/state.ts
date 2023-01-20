import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class State {
    constructor(state: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const isValid = this.validate(state);

            if (!isValid)
                throw new ValidationException('Estado inválido.');
        }

        this.state = state;
    }

    private readonly state: string;

    get value(): string {
        return this.state;
    }

    private validate(state: string): boolean {
        return !!state.trim().length;
    }
}