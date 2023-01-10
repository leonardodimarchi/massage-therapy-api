import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
import { UserName } from "@/domain/entities/user/value-objects/name/user_name";
import { RawUserEntity } from "../schema/user_schema";

export class TypeOrmUserMapper {
    static toSchema(user: UserEntity): RawUserEntity {
        return {
            id: user.id,
            birthDate: user.birthDate,
            email: user.email.value,
            name: user.name.value,
            password: user.password,
            phone: user.phone,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
    }

    static toDomain(raw: RawUserEntity): UserEntity {
        return new UserEntity({
            email: new UserEmail(raw.email),
            birthDate: raw.birthDate,
            name: new UserName(raw.name),
            password: raw.password,
            phone: raw.phone,
        }, {
            id: raw.id,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}