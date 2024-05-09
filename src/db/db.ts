import { readdir, readFile } from "fs/promises";
import pool from "../config/mysql-config";
import userService from "../service/user-service";
import { Roles, User, UserArea } from "../types/user";
import crypPassword from "../utils/crypt-password";

const startDB = async () => {
  const files = await readdir(__dirname);

  files.forEach(async (file) => {
    if (file === "db.ts" || file === "db.js") return;
    const sql = await readFile(`${__dirname}/${file}`, {
      encoding: "utf-8",
    });
    await pool.query(sql).catch((err) => {
      console.log(err.message);
    });
  });

  const password = await crypPassword("1234");

  await userService
    .saveAdmin({
      email: "admin@email.com",
      fullname: "admin",
      area: UserArea.admin,
      password: password,
      role: Roles.admin,
    } as User)
    .catch(() => {
      console.log("duplicated admin user");
    })
    .finally(() => {
      console.log("user admin created");
    });
};

export default startDB;
