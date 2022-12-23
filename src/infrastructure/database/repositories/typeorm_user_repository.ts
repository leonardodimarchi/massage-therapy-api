import { UserPayload } from "../../../domain/models/payloads/user_payload";
import { UserEntity } from "../../../domain/entities/user_entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from "../schema/user_schema";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";

export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<UserEntity>,
    ) { }

    public async register(params: UserPayload): Promise<UserEntity> {
        return await this.typeOrmRepository.save(params);
    }

    public async getByEmail(email: string): Promise<UserEntity> {
        return await this.typeOrmRepository.findOne({
            where: { email }
        });
    }
}