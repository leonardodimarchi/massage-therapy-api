import { AddressRepository } from "@/domain/contracts/repositories/address_repository";
import { AddressEntity } from "@/domain/entities/address/address_entity";

export class InMemoryAddressRepository implements AddressRepository {
    
    public addresses: AddressEntity[] = [];

    public async create(address: AddressEntity): Promise<AddressEntity> {
        const newAddress = new AddressEntity({
            city: address.city,
            state: address.state,
            neighborhood: address.neighborhood,
            postalCode: address.postalCode,
            userId: address.userId,
            houseNumber: address.houseNumber,
        }, {
            id: this.getNextId(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        this.addresses.push(newAddress);

        return newAddress;
    }

    private getNextId(): number {
        const ids = this.addresses.map(a => a.id);

        if (ids.length)
            return Math.max(...ids) + 1;
        
        return 1;
    }
}