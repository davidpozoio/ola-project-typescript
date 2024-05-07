import pool from "../../config/mysql-config";
import { User } from "../../types/user";
import { UserRepository } from "./user-repository";
import { ResultSetHeader } from "mysql2/promise";

export default class MysqlUserRepository extends UserRepository {
  async findAll(): Promise<User[]> {
    const [users] = await pool.query<User[]>("SELECT * FROM users");
    return users;
  }

  async findById(id: string | number | undefined): Promise<User | undefined> {
    const [[user]] = await pool.query<User[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return user;
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
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return user;
  }
}
