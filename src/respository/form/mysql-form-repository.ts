import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Form } from "../../types/form";
import { FormRepository } from "./form-repository";
import { response } from "express";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>(
      `SELECT form.*, form_group.*, field.*
      FROM form 
      LEFT JOIN form_group ON form_group.id=form.id
      LEFT JOIN field ON field.form_group_id=form_group.id`
    );
    /*
      {
        forms: [{
          form: {
            id: 1
          },
          form_group: {
            id: 1
          }
        }]
      }
    */
    const responseBody: Form[] = [];

    for (let row of forms) {
      const { form_group, fields, form } = row;
      const index = responseBody.findIndex((item) => item.id === form.id);
      if (index === -1) {
        responseBody.push({
          ...form,
          form_groups: [],
        });
      } else {
        responseBody[index].form_groups.push({
          ...form_group,
        });
      }
    }

    return responseBody;
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
