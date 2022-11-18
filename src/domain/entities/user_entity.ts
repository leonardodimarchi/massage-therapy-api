import { UserProxy } from "../models/proxies/user_proxy";
import { BaseEntityProperties, Entity } from "../shared/entity";
import { ProxyMapper } from "../shared/proxy_mapper";
import { AppointmentEntity } from "./appointment_entity";

interface UserProperties extends BaseEntityProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    appointments?: AppointmentEntity[];
}

export class UserEntity extends Entity implements ProxyMapper<UserProxy> {
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

    toProxy(): UserProxy {
        return new UserProxy(this);
    }
}