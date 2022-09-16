import { BaseProxyProperties, BaseProxy } from "@/domain/shared/base_proxy";
import { UserProxy } from "./user_proxy";

interface AppointmentProxyProperties extends BaseProxyProperties {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserProxy;
}

export class AppointmentProxy extends BaseProxy {
    userId: number;
    complaint: string;
    isUnderMedicalTreatment: boolean;
    symptoms: string;
    startsAt: Date;
    endsAt: Date;
    isPregnant?: boolean;
    pregnantWeeks?: number;

    user?: UserProxy;

    constructor(props: AppointmentProxyProperties) {
        super(props);

        this.userId = props.userId;
        this.complaint = props.complaint;
        this.isUnderMedicalTreatment = props.isUnderMedicalTreatment;
        this.symptoms = props.symptoms;
        this.startsAt = props.startsAt;
        this.endsAt = props.endsAt;
        this.isPregnant = props.isPregnant;
        this.pregnantWeeks = props.pregnantWeeks;
    
        this.user = props.user;
    }
}