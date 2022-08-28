import { Entity } from "../shared/entity";

interface UserProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
}

export class UserEntity implements Entity {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;

    constructor(props: UserProperties) {
        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
    }
}