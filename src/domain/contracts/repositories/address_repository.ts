import { AddressEntity } from "@/domain/entities/address/address_entity";

export abstract class AddressRepository {
    abstract create(address: AddressEntity): Promise<AddressEntity>;
}
