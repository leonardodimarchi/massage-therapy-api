import { UserRepository } from "../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../domain/entities/user_entity";
import { UserPayload } from "../../domain/models/payloads/user_payload";
import { UserDatasource } from "../contracts/datasources/user_datasource";

export class UserRepositoryImplementation implements UserRepository {

    constructor(private readonly datasource: UserDatasource) {}

    public async register(params: UserPayload): Promise<UserEntity> {
        return await this.datasource.register(params);
    }

    public async getByEmail(email: string): Promise<UserEntity> {
        return await this.datasource.getByEmail(email);
    }
}