import { UserEntity } from "@/domain/entities/user_entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { UserSchema } from "../schema/user_schema";
import { TypeOrmUserMapper } from "../mappers/typeorm_user.mapper";

export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<UserEntity>,
    ) { }

    public async register(user: UserEntity): Promise<UserEntity> {
        const raw = TypeOrmUserMapper.toSchema(user);

        return await this.typeOrmRepository.save(raw);
    }

    public async getByEmail(email: string): Promise<UserEntity | null> {
        const raw = await this.typeOrmRepository.findOne({
            where: { email }
        });

        if (!raw)
            return null;

       return TypeOrmUserMapper.toDomain(raw);
    }
}