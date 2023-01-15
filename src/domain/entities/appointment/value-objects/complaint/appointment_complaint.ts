import { ValidationException } from "@/domain/exceptions/validation_exception";
import { ValueObjectOptions } from "@/domain/models/interfaces/value-object-options.interface";

export class AppointmentComplaint {
    constructor(complaint: string, options?: ValueObjectOptions) {
        const defaultOptions: ValueObjectOptions = {
            validate: true,
        }

        const {
            validate
        } = Object.assign(defaultOptions, options);

        if (validate) {
            const hasValidLength = this.validateComplaintLength(complaint);

            if (!hasValidLength)
                throw new ValidationException('A descrição deve possuir entre 5 e 1024 caracteres.');
        }

        this.complaint = complaint;
    }

    private readonly complaint: string;

    get value(): string {
        return this.complaint;
    }

    private validateComplaintLength(complaint: string): boolean {
        return complaint.trim().length >= 5 && complaint.trim().length <= 1024;
    }
}