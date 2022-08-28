import { UserEntity } from "../entities/user_entity";

export abstract class UserRepository {
    abstract register(params: UserRegisterParams): Promise<UserEntity>;
}

export interface UserRegisterParams {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
}