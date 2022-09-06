interface LoginPayloadProperties {
    email: string;
    password: string;
}

export class LoginPayload {
    email: string;
    password: string;

    constructor(props: LoginPayloadProperties) {
        this.email = props.email;
        this.password = props.password;
    }
}