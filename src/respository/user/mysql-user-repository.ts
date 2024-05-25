import pool from "../../config/mysql-config";
import { Multimedia } from "../../types/multimedia";
import { User } from "../../types/user";
import getNestedTables from "../../utils/get-nested-tables";
import { UserRepository } from "./user-repository";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

interface UserResult extends RowDataPacket {
  users: User[];
  multimedia: Multimedia[];
}

export default class MysqlUserRepository extends UserRepository {
  async findAll(): Promise<User[]> {
    const [users] = await pool.query<User[]>("SELECT * FROM users");
    return users;
  }

  async findById(id: string | number | undefined): Promise<User | undefined> {
    const [users] = await pool.query<UserResult[]>(
      {
        sql: `
        SELECT users.*, multimedia.* FROM users
          LEFT JOIN multimedia
          ON multimedia.users_id = users.id
          WHERE users.id = ?`,
        nestTables: true,
      },
      [id]
    );
    console.log(users);
    const values = await getNestedTables(
      users,
      [{ nameTable: "multimedia", foreingTableName: "users" }],
      { recoverFrom: "users" }
    );

    return values[0];
  }

  async save(user: User): Promise<User> {
    const [createdUser] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (email, fullname, password, area, has_access, role) VALUES (?, ?, ?, ?, ?, ?)",
      [user.email, user.fullname, user.password, user.area, 0, user.role]
    );

    return {
      id: createdUser.insertId,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      area: user.area,
    } as User;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [[user]] = await pool.query<User[]>(
      "SELECT id, email, password, fullname, area, has_access, role FROM users WHERE email = ?",
      [email]
    );
    return user;
  }

  async saveAdmin(user: User): Promise<User> {
    const [createdUser] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (email, fullname, password, area, has_access, role, verified) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user.email, user.fullname, user.password, user.area, 1, user.role, 1]
    );

    return {
      id: createdUser.insertId,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      area: user.area,
    } as User;
  }

  async toggleAccessUser(
    access: boolean,
    userId: number | string
  ): Promise<User> {
    const [updatedUser] = await pool.query<ResultSetHeader>(
      "UPDATE users SET has_access = ? WHERE id = ?",
      [Number(access), userId]
    );

    return {
      id: updatedUser.insertId,
    } as User;
  }
}
