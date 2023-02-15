import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const dbConnect = new Pool({
  host: process.env.POSTGRES_HOST,
  database:
    process.env.ENV === "dev"
      ? process.env.POSTGRES_DB
      : process.env.POSTGRES_DB_TEST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: +process.env.POSTGRES_PORT!,
});

dbConnect.on("error", (error: Error) => {
  throw new Error(`Error has occured: ${error}`);
});

export default dbConnect;
