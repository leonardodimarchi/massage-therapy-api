import { UserEntity } from "@/domain/entities/user_entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from "../schema/user_schema";
import { UserRepository } from "@/domain/contracts/repositories/user_repository";

export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private typeOrmRepository: Repository<UserEntity>,
    ) { }

    public async register(user: UserEntity): Promise<UserEntity> {
        return await this.typeOrmRepository.save({
            id: user.id,
            birthDate: user.birthDate,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        });
    }

    public async getByEmail(email: string): Promise<UserEntity> {
        const raw = await this.typeOrmRepository.findOne({
            where: { email }
        });

        return new UserEntity({
            email: raw.email,
            birthDate: raw.birthDate,
            name: raw.name,
            password: raw.password,
            phone: raw.phone,
        }, {
            id: raw.id,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}