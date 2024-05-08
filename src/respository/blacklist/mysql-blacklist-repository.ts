import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Blacklist } from "../../types/blacklist";
import BlacklistRepository from "./blacklist-repository";

export default class MysqlBlacklistRepository extends BlacklistRepository {
  async save(blacklist: Blacklist): Promise<Blacklist> {
    const [createdBlacklist] = await pool.query<ResultSetHeader>(
      "INSERT INTO blacklist (token, user_id) VALUES (?, ?)",
      [blacklist.token, blacklist.user_id]
    );

    return {
      id: createdBlacklist.insertId,
      token: blacklist.token,
    } as Blacklist;
  }

  async find(blacklist: Blacklist): Promise<Blacklist | undefined> {
    const [[foundBlacklist]] = await pool.query<Blacklist[]>(
      "SELECT * FROM blacklist WHERE user_id = ? AND token = ?",
      [blacklist.user_id, blacklist.token]
    );

    return foundBlacklist;
  }
}
