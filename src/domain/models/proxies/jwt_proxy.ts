interface JwtProperties {
    access_token: string;
}

export class JwtProxy {
    access_token: string;

    constructor(props: JwtProperties) {
        this.access_token = props.access_token;
    }
}