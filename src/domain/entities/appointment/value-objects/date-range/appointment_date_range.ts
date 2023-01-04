import { ValidationException } from "@/domain/exceptions/validation_exception";

interface AppointmentDateRangeProps {
    startsAt: Date;
    endsAt: Date;
}

export class AppointmentDateRange {
    constructor(range: AppointmentDateRangeProps) {
        const haveSameDay = this.haveSameDay(range);

        if (!haveSameDay)
            throw new ValidationException('A data inicial e final do agendamento não podem ser em dias diferentes');

        this.range = range;
    }

    private readonly range: AppointmentDateRangeProps;

    get value(): AppointmentDateRangeProps {
        return this.range;
    }

    private haveSameDay({ startsAt, endsAt }: AppointmentDateRangeProps): boolean {
        return startsAt.getDate() === endsAt.getDate();
    }
}