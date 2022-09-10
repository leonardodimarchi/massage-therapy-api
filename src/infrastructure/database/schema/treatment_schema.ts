import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';
import { TreatmentEntity } from '../../../domain/entities/treatment_entity';
import { UserSchema } from './user_schema';

export const TreatmentSchema = new EntitySchema<TreatmentEntity>({
  name: 'Treatments',
  tableName: 'treatments',
  columns: {
    ...BaseSchemaColumns,
    userId: {
      type: Number,
    },
    complaint: {
      type: String,
      length: 1024,
    },
    symptoms: {
      type: String,
      length: 1024,
    },
    isUnderMedicalTreatment: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
    },
    pregnantWeeks: {
      type: Number,
      nullable: true,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: UserSchema,
      joinColumn: true,
      inverseSide: 'Users'
    }
  },
});