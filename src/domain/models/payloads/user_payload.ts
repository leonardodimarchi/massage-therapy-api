export interface UserPayloadProps {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;
}

export class UserPayload {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    constructor(props: UserPayloadProps) {
        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
        this.password = props.password;
    }
}