import { UserEntity } from "../entities/user_entity";
import { Validators } from "../shared/validations/validators";

export abstract class UserRepository {
    abstract register(params: UserRegisterParams): Promise<UserEntity>;
}

interface UserRegisterProperties {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
}

export class UserRegisterParams {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;

    constructor(props: UserRegisterProperties) {
        this.email = props.email;
        this.name = props.name;
        this.phone = props.phone;
        this.birthDate = props.birthDate;
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
        return this.birthDate instanceof Date;
    }
}