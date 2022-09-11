import { UserEntity } from '../../../domain/entities/user_entity';
import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';
import { TreatmentSchema } from './treatment_schema';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'Users',
  tableName: 'users',
  columns: {
    ...BaseSchemaColumns,
    email: {
      type: String,
      length: 50,
    },
    name: {
      type: String,
      length: 50,
    },
    password: {
      type: String,
      length: 50,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    treatments: {
      type: 'one-to-many',
      target: 'treatments',
      inverseSide: 'Treatments'
    }
  }
});