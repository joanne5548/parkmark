import { Pool } from "pg";
import dotenv from "dotenv";

// make sure you config the .env file !!! >:(
dotenv.config();

const pool: Pool = new Pool({
    user: "postgres",
    password: process.env.PSQL_PASSWORD,
    host: "localhost",
    port: 5432, // has to be different from express server port!
    database: "parkmark",
});

export default pool;
