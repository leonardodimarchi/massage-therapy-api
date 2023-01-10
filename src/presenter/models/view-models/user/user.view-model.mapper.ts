import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserViewModel } from "./user.view-model";

export class UserViewModelMapper {
    static toModel(entity: UserEntity): UserViewModel {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            birthDate: entity.birthDate,
            email: entity.email.value,
            name: entity.name.value,
            phone: entity.phone,
            updatedAt: entity.updatedAt
        }
    }
}