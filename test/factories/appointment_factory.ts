import { AppointmentEntity, AppointmentProps } from "@/domain/entities/appointment_entity";
import { AppointmentStatusEnum } from "@/domain/models/enums/appointment_status.enum";
import { EntityProps } from "@/domain/shared/entity";

interface MakeUserOverrideProps {
    override?: Omit<Partial<AppointmentProps>, keyof EntityProps>,
    entityPropsOverride?: Partial<EntityProps>,
}

export function makeAppointment(overrideProps: MakeUserOverrideProps = {}): AppointmentEntity {
    const override = overrideProps.override ?? {};
    const entityPropsOverride = overrideProps.entityPropsOverride ?? {};

    return new AppointmentEntity({
        userId: 1,
        complaint: '',
        isUnderMedicalTreatment: false,
        symptoms: '',
        startsAt: new Date(2023, 7, 20),
        endsAt: new Date(2023, 8, 4),
        status: AppointmentStatusEnum.PENDING,
        ...override,
    }, {
        id: 1,
        createdAt: new Date(2023, 7, 20),
        updatedAt: new Date(2023, 7, 20),
        ...entityPropsOverride,
    })
};