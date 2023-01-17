import { AppointmentEntity, AppointmentProps } from "@/domain/entities/appointment/appointment_entity";
import { AppointmentComplaint } from "@/domain/entities/appointment/value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "@/domain/entities/appointment/value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "@/domain/entities/appointment/value-objects/symptoms/appointment_symptoms";
import { AppointmentStatusEnum } from "@/domain/entities/appointment/enum/appointment_status.enum";
import { EntityProps } from "@/domain/shared/entity";
import { ONE_MILLISECOND } from "@/helpers/date_constants";

interface MakeUserOverrideProps {
    override?: Omit<Partial<AppointmentProps>, keyof EntityProps>,
    entityPropsOverride?: Partial<EntityProps>,
}

export function makeAppointment(overrideProps: MakeUserOverrideProps = {}): AppointmentEntity {
    const override = overrideProps.override ?? {};
    const entityPropsOverride = overrideProps.entityPropsOverride ?? {};

    const startsAt = new Date(new Date().getTime() + ONE_MILLISECOND);
    const endsAt = new Date(startsAt.getTime() + ONE_MILLISECOND);

    return new AppointmentEntity({
        userId: 1,
        complaint: new AppointmentComplaint('Those two last weeks i have been felling a strong headache'),
        symptoms: new AppointmentSymptoms('Headache, insomnia'),
        dateRange: new AppointmentDateRange({ startsAt, endsAt }),
        isUnderMedicalTreatment: false,
        status: AppointmentStatusEnum.PENDING,
        ...override,
    }, {
        id: 1,
        createdAt: new Date(2023, 7, 20),
        updatedAt: new Date(2023, 7, 20),
        ...entityPropsOverride,
    })
};