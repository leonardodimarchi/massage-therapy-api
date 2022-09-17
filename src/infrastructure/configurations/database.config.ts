import {registerAs} from "@nestjs/config";
import { join } from "path";
import { DataSourceOptions, LoggerOptions } from "typeorm";

export const ENV_DB_CONFIG_KEY = 'database';

export type DbConfig = DataSourceOptions;

export default registerAs<DbConfig>(ENV_DB_CONFIG_KEY, () => {
    return {
        type: 'sqlite',
        logging: process.env.DB_LOGGING as LoggerOptions,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.MODE === "dev",
        entities: [join(__dirname, '../database', '**', '*_schema{.ts,.js}')]
    }
})