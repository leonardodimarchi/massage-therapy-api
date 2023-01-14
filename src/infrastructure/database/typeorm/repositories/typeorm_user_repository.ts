import { UserEntity } from "@/domain/entities/user/user_entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from "@/domain/contracts/repositories/user_repository";
import { RawUserEntity, UserSchema } from "../schema/user_schema";
import { TypeOrmUserMapper } from "../mappers/typeorm_user.mapper";

export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<RawUserEntity>,
    ) { }

    public async register(user: UserEntity): Promise<UserEntity> {
        const userToSave = TypeOrmUserMapper.toSchema(user);
        
        const raw = await this.typeOrmRepository.save(userToSave);

        return TypeOrmUserMapper.toDomain(raw);
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