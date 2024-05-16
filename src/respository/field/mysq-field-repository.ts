import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";

import FieldRepository from "./field-repository";
import { Field } from "../../types/form-scheme";

export default class MysqlFieldRepository extends FieldRepository {
  async updateResult(field: Field): Promise<Field> {
    await pool.query<ResultSetHeader>(
      "UPDATE field SET metadata = ? WHERE id = ?",
      [field.metadata, field.id]
    );

    return {
      id: field.id,
      metadata: field.metadata,
    } as Field;
  }
}
