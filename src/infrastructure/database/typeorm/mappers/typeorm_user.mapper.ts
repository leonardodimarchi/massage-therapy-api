import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserBirthdate } from "@/domain/entities/user/value-objects/birthdate/user_birthdate";
import { UserEmail } from "@/domain/entities/user/value-objects/email/user_email";
import { UserName } from "@/domain/entities/user/value-objects/name/user_name";
import { UserPassword } from "@/domain/entities/user/value-objects/password/user_password";
import { UserPhone } from "@/domain/entities/user/value-objects/phone/user_phone";
import { RawUserEntity } from "../schema/user_schema";

export class TypeOrmUserMapper {
    static toSchema(user: UserEntity): RawUserEntity {
        return {
            id: user.id,
            birthDate: user.birthDate.value,
            email: user.email.value,
            name: user.name.value,
            password: user.password.value,
            phone: user.phone.value,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
    }

    static toDomain(raw: RawUserEntity): UserEntity {
        return new UserEntity({
            email: new UserEmail(raw.email),
            birthDate: new UserBirthdate(raw.birthDate),
            name: new UserName(raw.name),
            password: new UserPassword(raw.password),
            phone: new UserPhone(raw.phone),
        }, {
            id: raw.id,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}