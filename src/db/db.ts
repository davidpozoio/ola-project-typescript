import { readdir, readFile } from "fs/promises";
import pool from "../config/mysql-config";

const startDB = async () => {
  const files = await readdir(__dirname);

  await pool.query("SET SESSION time_zone = '+00:00'");

  files.forEach(async (file) => {
    if (file === "db.ts" || file === "db.js") return;
    const sql = await readFile(`${__dirname}/${file}`, {
      encoding: "utf-8",
    });
    await pool.query({ sql, nestTables: true }).catch((err) => {
      console.log(err.message);
    });
  });
};

export default startDB;
