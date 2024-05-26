import mysql from "mysql2/promise";
import ENV from "../const/env";

const pool = mysql.createPool({
  database: ENV.DATABASE_NAME,
  user: ENV.DATABASE_USERNAME,
  host: ENV.DATABASE_HOST,
  password: ENV.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
