import { ValidationException } from "@/domain/exceptions/validation_exception";

export class AppointmentSymptoms {
    constructor(symptoms: string) {
        const hasValidLength = this.validateLength(symptoms);

        if (!hasValidLength)
            throw new ValidationException('Os sintomas devem ser descritos em ao menos 3 caracteres e no máximo 1024 caracteres.');

        this.symptoms = symptoms;
    }

    private readonly symptoms: string;

    get value(): string {
        return this.symptoms;
    }

    private validateLength(complaint: string): boolean {
        return complaint.trim().length >= 3 && complaint.trim().length <= 1024;
    }
}