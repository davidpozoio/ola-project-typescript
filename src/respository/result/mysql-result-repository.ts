import { ResultSetHeader } from "mysql2";
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

  async save(result: Result): Promise<Result> {
    const [createdResult] = await pool.query<ResultSetHeader>(
      "INSERT INTO result (user_id, field_id, response) VALUES (?, ?, ?)",
      [result.user_id, result.field_id, JSON.stringify(result.response)]
    );

    return {
      id: createdResult.insertId,
      user_id: result.user_id,
      field_id: result.field_id,
    } as Result;
  }

  async findByUserIdAndFieldId(result: Result): Promise<Result> {
    const [[selectedResult]] = await pool.query<Result[]>(
      "SELECT * FROM result WHERE user_id = ? AND field_id = ?",
      [result.user_id, result.field_id]
    );

    return selectedResult;
  }

  async update(result: Result): Promise<Result> {
    const [updatedResult] = await pool.query<ResultSetHeader>(
      "UPDATE result SET response = ? WHERE user_id = ? AND field_id = ?",
      [JSON.stringify(result.response), result.user_id, result.field_id]
    );

    return {
      id: updatedResult.insertId,
      user_id: result.user_id,
      field_id: result.field_id,
    } as Result;
  }
}
