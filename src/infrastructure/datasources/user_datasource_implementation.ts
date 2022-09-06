import { UserPayload } from "../../domain/models/payloads/user_payload";
import { UserEntity } from "../../domain/entities/user_entity";
import { UserDatasource } from "../contracts/datasources/user_datasource";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from "../database/schema/user_schema";

export class UserDatasourceImplementation implements UserDatasource {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<UserEntity>,
    ) { }

    public async register(params: UserPayload): Promise<UserEntity> {
        return await this.typeOrmRepository.save(params);
    }

    public async getByEmail(email: string): Promise<UserEntity> {
        // TODO: Implement
        return null;
    }
}