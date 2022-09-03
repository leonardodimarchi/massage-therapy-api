import { BaseProxy, BaseProxyProperties } from "../../../domain/shared/base_proxy";

interface UserProxyProperties extends BaseProxyProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
}

export class UserProxy extends BaseProxy {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;

    constructor(props: UserProxyProperties) {
        super(props);

        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
    }
}