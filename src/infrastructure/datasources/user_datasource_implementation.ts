import { UserRegisterPayload } from "../../domain/contracts/repositories/user_repository";
import { UserEntity } from "../../domain/entities/user_entity";
import { UserDatasource } from "../contracts/datasources/user_datasource";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from "../database/schema/user_schema";

export class UserDatasourceImplementation implements UserDatasource {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<UserEntity>,
    ) {}

    async register(params: UserRegisterPayload): Promise<UserEntity> {
        return await this.typeOrmRepository.save(params);
    }
}