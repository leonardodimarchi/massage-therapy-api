import { Replace } from "src/helpers/replace";
import { AppointmentStatusEnum } from "../../models/enums/appointment_status.enum";
import { EntityProps, Entity } from "../../shared/entity";
import { UserEntity } from "../user_entity";
import { AppointmentComplaint } from "./value-objects/appointment_complaint";
import { AppointmentSymptoms } from "./value-objects/appointment_symptoms";

export interface AppointmentProps {
    complaint: AppointmentComplaint;
    isUnderMedicalTreatment: boolean;
    symptoms: AppointmentSymptoms;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;
    status: AppointmentStatusEnum;

    userId: number;
    user?: UserEntity;
}

export class AppointmentEntity extends Entity {
    private props: AppointmentProps

    constructor(props: Replace<AppointmentProps, { status?: AppointmentStatusEnum }>, entityProps?: EntityProps) {
        super(entityProps);

        this.props = {
            ...props,
            status: props.status ?? AppointmentStatusEnum.PENDING,
        };
    }

    public set complaint(complaint: AppointmentComplaint) {
        this.props.complaint = complaint;
    }

    public get complaint(): AppointmentComplaint {
        return this.props.complaint;
    }

    public set isUnderMedicalTreatment(isUnderMedicalTreatment: boolean) {
        this.props.isUnderMedicalTreatment = isUnderMedicalTreatment;
    }

    public get isUnderMedicalTreatment(): boolean {
        return this.props.isUnderMedicalTreatment;
    }

    public set symptoms(symptoms: AppointmentSymptoms) {
        this.props.symptoms = symptoms;
    }

    public get symptoms(): AppointmentSymptoms {
        return this.props.symptoms;
    }

    public set startsAt(startsAt: Date) {
        this.props.startsAt = startsAt;
    }

    public get startsAt(): Date {
        return this.props.startsAt;
    }

    public set endsAt(endsAt: Date) {
        this.props.endsAt = endsAt;
    }

    public get endsAt(): Date {
        return this.props.endsAt;
    }

    public set isPregnant(isPregnant: boolean) {
        this.props.isPregnant = isPregnant;
    }

    public get isPregnant(): boolean {
        return this.props.isPregnant;
    }

    public set pregnantWeeks(pregnantWeeks: number) {
        this.props.pregnantWeeks = pregnantWeeks;
    }

    public get pregnantWeeks(): number {
        return this.props.pregnantWeeks;
    }

    public set status(status: AppointmentStatusEnum) {
        this.props.status = status;
    }

    public get status(): AppointmentStatusEnum {
        return this.props.status;
    }

    public get userId(): number {
        return this.props.userId;
    }

    public get user(): UserEntity {
        return this.props.user;
    }
}