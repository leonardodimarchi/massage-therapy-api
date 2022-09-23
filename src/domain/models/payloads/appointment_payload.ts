export interface AppointmentPayloadProps {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment?: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;
}

export class AppointmentPayload {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    constructor(props: AppointmentPayloadProps) {
        this.userId = props.userId;
        this.complaint = props.complaint;
        this.isUnderMedicalTreatment = props.isUnderMedicalTreatment ?? false;
        this.symptoms = props.symptoms;
        this.startsAt = props.startsAt instanceof Date ? props.startsAt : new Date(props.startsAt);
        this.endsAt = props.endsAt instanceof Date ? props.endsAt : new Date(props.endsAt);
        this.isPregnant = props.isPregnant;
        this.pregnantWeeks = props.pregnantWeeks;
    }
}