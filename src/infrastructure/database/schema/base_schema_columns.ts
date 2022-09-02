import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseSchemaColumns = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'text',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'text',
    updateDate: true,
  } as EntitySchemaColumnOptions,
};