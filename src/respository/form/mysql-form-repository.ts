import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Form } from "../../types/form";
import { FormRepository } from "./form-repository";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>("SELECT * FROM form");
    return forms;
  }

  async save(form: Form): Promise<Form> {
    const [createdForm] = await pool.query<ResultSetHeader>(
      "INSERT INTO form (label, user_id)",
      [form.label, form.user_id]
    );

    return {
      id: createdForm.insertId,
      label: form.label,
    } as Form;
  }
}
