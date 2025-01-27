import { Pool } from "pg";
import dotenv from "dotenv";

// make sure you config the .env file !!! >:(
dotenv.config();

const pool: Pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!), // has to be different from express server port!
    database: process.env.DB_NAME,
});

export default pool;
