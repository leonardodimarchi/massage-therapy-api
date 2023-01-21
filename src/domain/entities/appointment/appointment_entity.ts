import { Replace } from "src/helpers/replace";
import { AppointmentStatusEnum } from "./enum/appointment_status.enum";
import { EntityProps, Entity } from "../../shared/entity";
import { AppointmentComplaint } from "./value-objects/complaint/appointment_complaint";
import { AppointmentDateRange } from "./value-objects/date-range/appointment_date_range";
import { AppointmentSymptoms } from "./value-objects/symptoms/appointment_symptoms";
import { UserEntity } from "../user/user_entity";

export interface AppointmentProps {
    complaint: AppointmentComplaint;
    isUnderMedicalTreatment: boolean;
    symptoms: AppointmentSymptoms;
    dateRange: AppointmentDateRange;
    isPregnant?: boolean;
    pregnantWeeks?: number;
    status: AppointmentStatusEnum;

    userId: number;

    user?: UserEntity;
}

export class AppointmentEntity extends Entity {
    constructor(props: Replace<AppointmentProps, { status?: AppointmentStatusEnum }>, entityProps?: EntityProps) {
        super(entityProps);

        this.props = {
            ...props,
            status: props.status ?? AppointmentStatusEnum.PENDING,
        };
    }

    private props: AppointmentProps;

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

    public set dateRange(dateRange: AppointmentDateRange) {
      this.props.dateRange = dateRange;
    }
    
    public get dateRange(): AppointmentDateRange {
      return this.props.dateRange;
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