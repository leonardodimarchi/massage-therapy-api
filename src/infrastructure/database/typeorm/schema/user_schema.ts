import { UserProps } from '@/domain/entities/user/user_entity';
import { EntityProps } from '@/domain/shared/entity';
import { Replace } from '@/helpers/replace';
import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';

type EntityFields = UserProps & EntityProps;

type EntityFieldsToAddOrReplace = {
  email: string;
  name: string;
};

export type RawUserEntity = Replace<EntityFields, EntityFieldsToAddOrReplace>;

export const UserSchema = new EntitySchema<RawUserEntity>({
  name: 'Users',
  tableName: 'users',
  columns: {
    ...BaseSchemaColumns,
    email: {
      type: String,
      length: 50,
      unique: true,
    },
    name: {
      type: String,
      length: 50,
    },
    password: {
      type: String,
      length: 50,
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
      length: 50,
    }
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    appointments: {
      type: 'one-to-many',
      target: 'appointments',
      inverseSide: 'Appointments'
    }
  }
});