import { UserEntity } from "../../entities/user_entity";

export abstract class UserRepository {
    abstract register(params: {
        email: string;
        name: string;
        phone: string;
        birthDate: Date;
        password: string;
    }): Promise<UserEntity>;
    abstract getByEmail(email: string): Promise<UserEntity>;
}
