import { UserEntity } from "../../entities/user_entity";
import { Validators } from "../../shared/validations/validators";

export abstract class UserRepository {
    abstract register(params: UserRegisterPayload): Promise<UserEntity>;
}

interface UserRegisterProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;
}

export class UserRegisterPayload {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;

    constructor(props: UserRegisterProperties) {
        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
        this.password = props.password;
    }

    public isValidEmail(): boolean {
        return Validators.isValidEmail(this.email);
    }

    public isValidName(): boolean {
        return !!this.name.length;
    }

    public isValidPhone(): boolean {
        return !!this.phone.length;
    }

    public isValidBirthDate(): boolean {
        return !!this.birthDate;
    }

    public isValidPassword(): boolean {
        return !!this.password?.length
    }
}