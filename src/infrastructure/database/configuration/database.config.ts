import {registerAs} from "@nestjs/config";
import { join } from "path";

export default registerAs('database', () => {
    return {
        type: process.env.DB_TYPE,
        logging: process.env.DB_LOGGING,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.MODE === "dev",
        entities: [join(__dirname, '..', '**', '*_schema{.ts,.js}')]
    }
})