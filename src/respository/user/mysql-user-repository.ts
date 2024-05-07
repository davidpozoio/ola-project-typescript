import pool from "../../config/mysql-config";
import { User } from "../../types/user";
import { UserRepository } from "./user-repository";
import { QueryResult, ResultSetHeader } from "mysql2/promise";

export default class MysqlUserRepository extends UserRepository {
  async findAll(): Promise<User[]> {
    const [users] = await pool.query<User[]>("SELECT * FROM users");
    return users;
  }

  async save(user: User): Promise<User> {
    console.log(user);
    const [createdUser] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (email, fullname, password, area, has_access) VALUES (?, ?, ?, ?, ?)",
      [user.email, user.username, user.password, user.area, 0]
    );

    return {
      id: createdUser.insertId,
      username: user.username,
      email: user.email,
      password: user.password,
      area: user.area,
    } as User;
  }
}
