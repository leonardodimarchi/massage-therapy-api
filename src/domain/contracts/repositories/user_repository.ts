import { UserPayload } from "../../../domain/models/payloads/user_payload";
import { UserEntity } from "../../entities/user_entity";

export abstract class UserRepository {
    abstract register(params: UserPayload): Promise<UserEntity>;
    abstract getByEmail(email: string): Promise<UserEntity>;
}
