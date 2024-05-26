import fs from "fs/promises";
import pool from "../config/mysql-config";
import path from "path";

const startDB = async () => {
  const files = await fs.readdir(__dirname);
  console.log(files);
  await pool.query("SET SESSION time_zone = '+00:00'");

  const filesPromise = files.map((file) => {
    if (file.match(/ts|js/)) {
      return undefined;
    }
    return fs
      .readFile(path.resolve(__dirname, file), {
        encoding: "utf-8",
      })
      .then((sql) => {
        return pool.query(sql).catch((err) => {
          console.log(err);
        });
      });
  });

  for (let filePromise of filesPromise) {
    await filePromise?.catch((err) => {
      console.log(err);
    });
  }
};

export default startDB;
