import { AddressProps } from '@/domain/entities/address/address_entity';
import { UserGenderEnum } from '@/domain/entities/user/enum/user_gender.enum';
import { EntityProps } from '@/domain/shared/entity';
import { Replace } from '@/helpers/replace';
import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';
import { RawUserEntity } from './user_schema';

type EntityFields = AddressProps & EntityProps;

type EntityFieldsToAddOrReplace = {
  postalCode: string;
  state: string;
  street: string;
  city: string;
  neighborhood: string;

  user?: RawUserEntity;
};

export type RawAddressEntity = Replace<EntityFields, EntityFieldsToAddOrReplace>;

export const AddressSchema = new EntitySchema<RawAddressEntity>({
  name: 'Addresses',
  tableName: 'addresses',
  columns: {
    ...BaseSchemaColumns,
    postalCode: {
      type: String,
      length: 8,
    },
    state: {
      type: String,
      length: 512,
    },
    city: {
      type: String,
      length: 512,
    },
    street: {
      type: String,
      length: 1024,
    },
    neighborhood: {
      type: String,
      length: 512,
    },
    houseNumber: {
      type: Number,
    },
    userId: {
      type: Number,
    }
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'users',
      inverseSide: 'address',
    }
  }
});