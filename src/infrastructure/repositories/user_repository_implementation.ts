import { UserRegisterPayload, UserRepository } from "src/domain/contracts/repositories/user_repository";
import { UserEntity } from "src/domain/entities/user_entity";
import { UserDatasource } from "../contracts/datasources/user_datasource";

export class UserRepositoryImplementation implements UserRepository {

    constructor(private readonly datasource: UserDatasource) {}

    public async register(params: UserRegisterPayload): Promise<UserEntity> {
        return await this.datasource.register(params);
    }
}