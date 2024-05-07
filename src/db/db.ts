import { readdir, readFile } from "fs/promises";
import pool from "../config/mysql-config";

const startDB = async () => {
  const files = await readdir(__dirname);

  files.forEach(async (file) => {
    if (file == "db.ts") return;
    const sql = await readFile(`${__dirname}/${file}`, {
      encoding: "utf-8",
    });
    pool.query(sql).catch((err) => {
      console.log(err.message);
    });
  });
};

export default startDB;
