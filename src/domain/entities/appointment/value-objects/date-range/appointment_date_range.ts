import { ValidationException } from "@/domain/exceptions/validation_exception";

export interface AppointmentDateRangeProps {
    startsAt: Date;
    endsAt: Date;
}

export class AppointmentDateRange {
    constructor(range: AppointmentDateRangeProps) {
        const haveSameDay = this.haveSameDay(range);
        const endIsAfterStart = this.endIsAfterStart(range);
        const startsAfterNow = this.startsAfterNow(range);

        if (!haveSameDay)
            throw new ValidationException('A data inicial e final do agendamento não podem ser em dias diferentes');

        if (!endIsAfterStart)
            throw new ValidationException('A data/horário final do agendamento não pode ser antes da data/horário inicial');

        if (!startsAfterNow)
            throw new ValidationException('A data/horário de agendamento não pode ser antes da data/horário atual');
            
        this.range = range;
    }

    private readonly range: AppointmentDateRangeProps;

    get value(): AppointmentDateRangeProps {
        return this.range;
    }

    private haveSameDay({ startsAt, endsAt }: AppointmentDateRangeProps): boolean {
        return startsAt.getDate() === endsAt.getDate();
    }

    private endIsAfterStart({ startsAt, endsAt }: AppointmentDateRangeProps): boolean {
        return endsAt.getTime() > startsAt.getTime();
    }

    private startsAfterNow({ startsAt }: AppointmentDateRangeProps): boolean {
        return startsAt.getTime() >= new Date().getTime();
    }
}