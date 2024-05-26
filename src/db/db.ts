import fs from "fs/promises";
import pool from "../config/mysql-config";
import path from "path";

const startDB = async () => {
  const files = await fs.readdir(__dirname);

  await pool.query("SET SESSION time_zone = '+00:00'");

  for (let file of files) {
    if (file.match(/ts|js/)) {
      break;
    }

    const sql = await fs.readFile(path.resolve(__dirname, file), {
      encoding: "utf-8",
    });

    await pool.query(sql).catch((err) => {
      console.log(err);
    });
  }
};

export default startDB;
