import { ValidationException } from "@/domain/exceptions/validation_exception";

export class AppointmentComplaint {
    constructor(complaint: string) {
        const hasValidLength = this.validateComplaintLength(complaint);

        if (!hasValidLength)
            throw new ValidationException('A descrição deve possuir entre 5 e 1024 caracteres.');

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