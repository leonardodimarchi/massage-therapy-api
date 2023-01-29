import { UserGenderEnum } from '@/domain/entities/user/enum/user_gender.enum';
import { UserProps } from '@/domain/entities/user/user_entity';
import { EntityProps } from '@/domain/shared/entity';
import { Replace } from '@/helpers/replace';
import { EntitySchema } from 'typeorm';
import { RawAddressEntity } from './address_schema';
import { RawAppointmentEntity } from './appointment_schema';
import { BaseSchemaColumns } from './base_schema_columns';

type EntityFields = UserProps & EntityProps;

type EntityFieldsToAddOrReplace = {
  email: string;
  name: string;
  password: string;
  birthDate: Date;
  phone: string;
  diseaseHistory?: string;
  
  appointments?: RawAppointmentEntity[];
  address?: RawAddressEntity;
};

export type RawUserEntity = Replace<EntityFields, EntityFieldsToAddOrReplace>;

export const UserSchema = new EntitySchema<RawUserEntity>({
  name: 'Users',
  tableName: 'users',
  columns: {
    ...BaseSchemaColumns,
    email: {
      type: String,
      length: 512,
      unique: true,
    },
    name: {
      type: String,
      length: 1024,
    },
    password: {
      type: String,
      length: 512,
    },
    birthDate: {
      type: Date,
    },
    phone: {
      type: String,
      length: 50,
    },
    gender: {
      type: String,
      enum: UserGenderEnum,
    },
    diseaseHistory: {
      type: String,
      length: 1024,
      nullable: true,
    }
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    address: {
      type: 'one-to-one',
      target: 'addresses',
      inverseSide: 'user',
    },
    appointments: {
      type: 'one-to-many',
      target: 'appointments',
      inverseSide: 'user'
    }
  }
});