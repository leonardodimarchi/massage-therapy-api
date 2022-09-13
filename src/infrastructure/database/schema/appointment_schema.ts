import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';
import { AppointmentEntity } from '../../../domain/entities/appointment_entity';

export const AppointmentSchema = new EntitySchema<AppointmentEntity>({
  name: 'Appointments',
  tableName: 'appointments',
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
      target: 'users',
      joinColumn: true,
      inverseSide: 'Users'
    }
  },
});