import pool from "../../config/mysql-config";
import { Result } from "../../types/result";
import ResultRespository from "./result-repository";

export default class MysqlResultRepository extends ResultRespository {
  async findAllUserResults(result: Result): Promise<Result[]> {
    const [results] = await pool.query<Result[]>(
      "SELECT * FROM result WHERE user_id = ?",
      [result.user_id]
    );

    return results;
  }
}
