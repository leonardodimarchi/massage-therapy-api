import { AddressEntity } from "@/domain/entities/address/address_entity";
import { City } from "@/domain/entities/address/value-objects/city/city";
import { Neighborhood } from "@/domain/entities/address/value-objects/neighborhood/neighborhood";
import { PostalCode } from "@/domain/entities/address/value-objects/postal-code/postal_code";
import { State } from "@/domain/entities/address/value-objects/state/state";
import { RawAddressEntity } from "../schema/address_schema";
import { TypeOrmUserMapper } from "./typeorm_user.mapper";

export class TypeOrmAddressMapper {
    static toSchema(address: AddressEntity): RawAddressEntity {
        return {
            id: address.id,
            createdAt: address.createdAt,
            updatedAt: address.updatedAt,
            postalCode: address.postalCode.value,
            state: address.state.value,
            city: address.city.value,
            neighborhood: address.neighborhood.value,
            houseNumber: address.houseNumber,
            userId: address.userId,
        };
    }

    static toDomain(raw: RawAddressEntity): AddressEntity {
        return new AddressEntity({
            postalCode: new PostalCode(raw.postalCode, { validate: false, }),
            state: new State(raw.state, { validate: false }),
            city: new City(raw.city, { validate: false }),
            neighborhood: new Neighborhood(raw.neighborhood, { validate: false }),
            houseNumber: raw.houseNumber,
            userId: raw.userId,
            ...raw.user && { user: TypeOrmUserMapper.toDomain(raw.user) },
        }, {
            id: raw.id,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        })
    }
}