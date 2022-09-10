import { BaseEntityProperties, Entity } from "../shared/entity";
import { UserEntity } from "./user_entity";

interface TreatmentProperties extends BaseEntityProperties {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserEntity;
}

export class TreatmentEntity extends Entity {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserEntity;

    constructor(props: TreatmentProperties) {
        super(props);

        this.userId = props.userId;
        this.complaint = props.complaint;
        this.isUnderMedicalTreatment = props.isUnderMedicalTreatment;
        this.symptoms = props.symptoms;
        this.isPregnant = props.isPregnant;
        this.pregnantWeeks = props.pregnantWeeks;
        
        this.user = props.user;
    }
}