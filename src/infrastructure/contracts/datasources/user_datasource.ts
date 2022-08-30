import { UserRegisterPayload } from "../../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../../domain/entities/user_entity";

export abstract class UserDatasource {
    abstract register(params: UserRegisterPayload): Promise<UserEntity>;
}