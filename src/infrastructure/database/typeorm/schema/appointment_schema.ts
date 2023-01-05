import { EntitySchema } from 'typeorm';
import { BaseSchemaColumns } from './base_schema_columns';
import { AppointmentProps } from '@/domain/entities/appointment/appointment_entity';
import { AppointmentStatusEnum } from '@/domain/models/enums/appointment_status.enum';
import { EntityProps } from '@/domain/shared/entity';
import { Replace } from '@/helpers/replace';

type EntityFields = AppointmentProps & EntityProps;

type EntityFieldsToRemove = 'dateRange';

type EntityFieldsToAddOrReplace = {
  complaint: string;
  symptoms: string;
  startsAt: Date;
  endsAt: Date;
};

export type RawAppointmentEntity = Replace<Omit<
  EntityFields,
  EntityFieldsToRemove
>, EntityFieldsToAddOrReplace>;

export const AppointmentSchema = new EntitySchema<RawAppointmentEntity>({
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
    startsAt: {
      type: Date,
    },
    endsAt: {
      type: Date,
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
    status: {
      type: String,
      enum: AppointmentStatusEnum,
      default: AppointmentStatusEnum.PENDING,
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