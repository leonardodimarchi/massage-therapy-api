import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.config";

export default new DataSource(dataSourceOptions);