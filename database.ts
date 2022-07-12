import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const dbConfig: any = {
  connectionString: process.env.DATABASE_URL
};

if(process.env.MODE === "PROD"){
  dbConfig.ssl = {
      rejectUnauthorized: false
  }
};

const db = new Pool(dbConfig);

export default db;

