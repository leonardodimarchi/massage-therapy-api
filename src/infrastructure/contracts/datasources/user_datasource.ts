import { UserPayload } from "../../../../src/domain/models/payloads/user_payload";
import { UserEntity } from "../../../../src/domain/entities/user_entity";

export abstract class UserDatasource {
    abstract register(params: UserPayload): Promise<UserEntity>;
}