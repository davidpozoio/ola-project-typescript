import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/mysql-config";

import FieldRepository from "./field-repository";
import { Field } from "../../types/form-scheme";
import { Owner } from "../repository";
import getNestedTables from "../../utils/get-nested-tables";
import { Result } from "../../types/result";

interface FieldResult extends RowDataPacket {
  field: Field[];
  Result: Result[];
}

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

  async findById(id: string | number | undefined): Promise<Field | undefined> {
    const [[field]] = await pool.query<Field[]>(
      "SELECT * FROM field WHERE id = ?",
      [id]
    );

    return field;
  }

  async findAllBySchemeId(
    formSchemeId: string | number,
    owner: Owner
  ): Promise<Field[]> {
    const [fields] = await pool.query<Field[]>(
      {
        sql: `
      SELECT field.* FROM form
      INNER JOIN form_scheme
      ON form_scheme.id = form.form_scheme_id
      INNER JOIN form_group
      ON form_group.form_scheme_id = form_scheme.id
      INNER JOIN field
      ON field.form_group_id = form_group.id
      WHERE form_scheme.id = ?
      `,
      },
      [formSchemeId]
    );

    return fields;
  }
}
