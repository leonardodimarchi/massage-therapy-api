import { UserEntity } from "@/domain/entities/user/user_entity";
import { UserViewModel } from "./user.view-model";

export class UserViewModelMapper {
    static toModel(entity: UserEntity): UserViewModel {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            birthDate: entity.birthDate.value,
            email: entity.email.value,
            name: entity.name.value,
            phone: entity.phone.value,
            updatedAt: entity.updatedAt,
            gender: entity.gender,
            ...entity.diseaseHistory && { diseaseHistory: entity.diseaseHistory.value },
        }
    }
}