import { UserRegisterPayload } from "../../../src/domain/contracts/repositories/user_repository";
import { UserEntity } from "../../../src/domain/entities/user_entity";
import { UserDatasource } from "../contracts/datasources/user_datasource";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserDatasourceImplementation implements UserDatasource {
    constructor(
        @InjectRepository(UserEntity)
        private typeOrmRepository: Repository<UserEntity>,
    ) {}

    async register(params: UserRegisterPayload): Promise<UserEntity> {
        return await this.typeOrmRepository.save(params);
    }
}