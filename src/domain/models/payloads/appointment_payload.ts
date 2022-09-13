interface AppointmentPayloadProperties {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    isPregnant?: boolean;
    pregnantWeeks?: number;
}

export class AppointmentPayload {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    constructor(props: AppointmentPayloadProperties) {
        this.userId = props.userId
        this.complaint = props.complaint
        this.isUnderMedicalTreatment = props.isUnderMedicalTreatment
        this.symptoms = props.symptoms
        this.isPregnant = props.isPregnant
        this.pregnantWeeks = props.pregnantWeeks
    }
}