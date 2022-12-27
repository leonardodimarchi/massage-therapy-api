import { AppointmentEntity } from "@/domain/entities/appointment_entity";
import { UserEntity } from "@/domain/entities/user_entity";

export class TypeOrmUserMapper {
    static toSchema(user: UserEntity) {
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

    static toDomain(raw: any): UserEntity {
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