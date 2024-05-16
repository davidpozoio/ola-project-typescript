import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Form } from "../../types/form";
import { FormRepository } from "./form-repository";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>({
      sql: `SELECT * from form`,
    });

    return forms;
  }

  async save(form: Form): Promise<Form> {
    const [createdForm] = await pool.query<ResultSetHeader>(
      "INSERT INTO form (done, hash, form_scheme_id, user_id) VALUES (?, ?, ?, ?)",
      [false, null, form.form_scheme_id, form.user_id]
    );

    return {
      id: createdForm.insertId,
      done: false,
      hash: null,
      form_scheme_id: form.form_scheme_id,
      user_id: form.user_id,
    } as Form;
  }
}
