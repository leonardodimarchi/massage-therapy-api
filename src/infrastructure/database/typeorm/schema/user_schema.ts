import { UserEntity } from '@/domain/entities/user_entity';
import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';

export const UserSchema = new EntitySchema<UserEntity>({
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