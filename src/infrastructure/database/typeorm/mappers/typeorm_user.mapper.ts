import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";

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
            email: user.email.value,
            name: user.name,
            password: user.password,
            phone: user.phone,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
    }

    static toDomain(raw: TypeOrmRawUser): UserEntity {
        return new UserEntity({
            email: new UserEmail(raw.email),
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