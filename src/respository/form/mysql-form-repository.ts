import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Field, Form, FormGroup } from "../../types/form";
import { FormRepository } from "./form-repository";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>(`
    SELECT form.*, 
      JSON_ARRAYAGG(JSON_OBJECT(
        'id', COALESCE(form_group.id, 'undefined'),
        'label', COALESCE(form_group.label, 'undefined'),
        'form_id', COALESCE(form_group.form_id, 'undefined')
      )) as form_groups 
    FROM form
    LEFT JOIN form_group ON form_group.id=form.id
    GROUP BY form.id, form.label`);
    return forms;
  }

  async save(form: Form): Promise<Form> {
    const [createdForm] = await pool.query<ResultSetHeader>(
      "INSERT INTO form (label) VALUES (?)",
      [form.label]
    );

    return {
      id: createdForm.insertId,
      label: form.label,
    } as Form;
  }
}
