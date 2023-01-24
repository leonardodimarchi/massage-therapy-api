import { AddressEntity } from "@/domain/entities/address/address_entity";
import { AddressViewModel } from "./address.view-model";

export class AddressViewModelMapper {
    static toModel(entity: AddressEntity): AddressViewModel {
        return {
            id: entity.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            state: entity.state.value,
            city: entity.city.value,
            neighborhood: entity.neighborhood.value,
            postalCode: entity.postalCode.value,
            houseNumber: entity.houseNumber,
            userId: entity.userId,
        }
    }
}