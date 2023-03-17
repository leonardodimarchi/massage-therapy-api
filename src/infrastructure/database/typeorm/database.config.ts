import { registerAs } from "@nestjs/config";
import { join } from "path";
import { DataSourceOptions, LoggerOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const ENV_DB_CONFIG_KEY = 'database';

export type DbConfig = DataSourceOptions;

export const dataSourceOptions: DataSourceOptions = {
    type: process.env.DB_TYPE as any,
    logging: process.env.DB_LOGGING as LoggerOptions,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    ...process.env.DB_TYPE === 'sqlite' && {
        database: process.env.DB_NAME,
    },
    ...process.env.DB_TYPE === 'postgres' && {
        url: process.env.DB_URL,
        ssl: true,
    },
    entities: [join(__dirname, 'schema', '**', '*_schema{.ts,.js}')],
    migrations: [join(__dirname, 'migrations', '*.ts')],
}

export default registerAs<DbConfig>(ENV_DB_CONFIG_KEY, () => {
    return {
        ...dataSourceOptions
    }
})