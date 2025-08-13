import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

// Determine the environment and load the correct .env file
const env = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${env}` });

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, '../entity/*.[tj]s')],
    migrations: [path.join(__dirname, '../migration/*.[tj]s')],
});

export default AppDataSource;