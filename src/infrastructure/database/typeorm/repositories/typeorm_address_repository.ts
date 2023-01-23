import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressRepository } from "@/domain/contracts/repositories/address_repository";
import { AddressSchema, RawAddressEntity } from "../schema/address_schema";
import { AddressEntity } from "@/domain/entities/address/address_entity";
import { TypeOrmAddressMapper } from "../mappers/typeorm_address.mapper";

export class TypeOrmAddressRepository implements AddressRepository {
    constructor(
        @InjectRepository(AddressSchema)
        private typeOrmRepository: Repository<RawAddressEntity>,
    ) { }

    public async create(address: AddressEntity): Promise<AddressEntity> {
        const addressToSave = TypeOrmAddressMapper.toSchema(address);

        const raw = await this.typeOrmRepository.save(addressToSave);

        return TypeOrmAddressMapper.toDomain(raw);
    }
}