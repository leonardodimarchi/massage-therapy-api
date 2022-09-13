import { BaseEntityProperties, Entity } from "../shared/entity";
import { UserEntity } from "./user_entity";

interface AppointmentProperties extends BaseEntityProperties {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserEntity;
}

export class AppointmentEntity extends Entity {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserEntity;

    constructor(props: AppointmentProperties) {
        super(props);

        this.userId = props.userId;
        this.complaint = props.complaint;
        this.isUnderMedicalTreatment = props.isUnderMedicalTreatment;
        this.symptoms = props.symptoms;
        this.isPregnant = props.isPregnant;
        this.pregnantWeeks = props.pregnantWeeks;
        this.startsAt = props.startsAt;
        this.endsAt = props.endsAt; 
        
        this.user = props.user;
    }
}