import { BaseEntityProperties, Entity } from "../shared/entity";
import { TreatmentEntity } from "./treatment_entity";

interface UserProperties extends BaseEntityProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    treatments?: TreatmentEntity[];
}

export class UserEntity extends Entity {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    treatments?: TreatmentEntity[];

    constructor(props: UserProperties) {
        super(props);

        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
        this.password = props.password;

        this.treatments = props.treatments;
    }
}