import { BaseEntityProperties, Entity } from "../shared/entity";
import { AppointmentEntity } from "./appointment_entity";

interface UserProperties extends BaseEntityProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    appointments?: AppointmentEntity[];
}

export class UserEntity extends Entity {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    appointments?: AppointmentEntity[];

    constructor(props: UserProperties) {
        super(props);

        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
        this.password = props.password;

        this.appointments = props.appointments;
    }
}