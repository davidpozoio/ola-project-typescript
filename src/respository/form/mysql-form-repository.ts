import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Field, Form, FormGroup } from "../../types/form";
import { FormRepository } from "./form-repository";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>({
      sql: `SELECT form.*, form_group.*, field.*
        FROM form 
        LEFT JOIN form_group ON form_group.form_id=form.id
        LEFT JOIN field ON field.form_group_id=form_group.id`,
      nestTables: true,
    });

    const formsColumn = new Map<string, Form>();
    const formsGroupColumn = new Map<string, FormGroup>();
    const fieldColumn = new Map<string, Field>();
    console.log(forms);

    forms.forEach((item) => {
      formsColumn.set(item.form.id, item.form);
    });

    const formsArray = Array.from(formsColumn.values());

    for (let form of formsArray) {
      forms.forEach((item) => {
        if (item.form_group.form_id === form.id) {
          formsGroupColumn.set(item.form_group.id, item.form_group);
        }
      });
      const indexForm = formsArray.findIndex((item) => item.id === form.id);
      formsArray[indexForm].form_groups = Array.from(formsGroupColumn.values());
      formsGroupColumn.clear();

      for (let form_group of formsArray[indexForm].form_groups) {
        forms.forEach((item) => {
          if (item.field.form_group_id === form_group.id) {
            fieldColumn.set(item.field.id, item.field);
          }
        });
        const indexFormGroup = formsArray[indexForm].form_groups.findIndex(
          (item) => item.id === form_group.id
        );

        formsArray[indexForm].form_groups[indexFormGroup].fields = Array.from(
          fieldColumn.values()
        );
        fieldColumn.clear();
      }
    }

    return formsArray;
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
