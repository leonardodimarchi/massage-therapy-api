import { UserEntity } from "@/domain/entities/user/user_entity";

interface TypeOrmRawUser {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;
}

export class TypeOrmUserMapper {
    static toSchema(user: UserEntity): TypeOrmRawUser {
        return {
            id: user.id,
            birthDate: user.birthDate,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
    }

    static toDomain(raw: TypeOrmRawUser): UserEntity {
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