import { UserEntity } from "../../entities/user_entity";

export abstract class UserRepository {
    abstract register(user: UserEntity): Promise<UserEntity>;
    abstract getByEmail(email: string): Promise<UserEntity | null>;
}
