import { UserRegisterPayload } from "../../../../src/domain/contracts/repositories/user_repository";
import { UserEntity } from "../../../../src/domain/entities/user_entity";

export abstract class UserDatasource {
    abstract register(params: UserRegisterPayload): Promise<UserEntity>;
}