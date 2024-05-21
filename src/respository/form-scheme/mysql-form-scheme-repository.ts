import { RowDataPacket } from "mysql2";
import pool from "../../config/mysql-config";
import { Field, FormGroup, FormScheme } from "../../types/form-scheme";
import FormSchemeRepository from "./form-scheme-repository";

interface FormColums extends RowDataPacket {
  form_scheme: FormScheme;
  form_group: FormGroup;
  field: Field;
}

export default class MysqlFormSchemeRepository extends FormSchemeRepository {
  async findAll(): Promise<FormScheme[]> {
    const [forms] = await pool.query<FormColums[]>({
      sql: `
      SELECT form_scheme.*, form_group.*, field.* from form_scheme 
        LEFT JOIN form_group 
        ON form_group.form_scheme_id = form_scheme.id
        LEFT JOIN field
        ON field.form_group_id = form_group.id`,
      nestTables: true,
    });

    const formSchemeMap = new Map<number, FormScheme>();
    const formGroupMap = new Map<number, FormGroup>();
    const fieldMap = new Map<number, Field>();

    forms.forEach(({ form_scheme, form_group, field }) => {
      formSchemeMap.set(form_scheme.id as number, form_scheme);
      formGroupMap.set(form_group.id as number, form_group);
      fieldMap.set(field.id as number, field);
    });

    const formSchemeArray: FormScheme[] = Array.from(formSchemeMap.values());

    for (let formScheme of formSchemeArray) {
      if (!formScheme.form_groups) {
        formScheme.form_groups = [];
      }
      Array.from(formGroupMap.values()).forEach((formGroup) => {
        if (formGroup.form_scheme_id !== formScheme.id) {
          return;
        }
        const index = formScheme.form_groups.push(formGroup);

        Array.from(fieldMap.values()).forEach((field) => {
          if (field.form_group_id !== formGroup.id) {
            return;
          }
          if (!formScheme.form_groups[index - 1].fields) {
            formScheme.form_groups[index - 1].fields = [];
          }
          formScheme.form_groups[index - 1].fields.push(field);
        });
      });
    }

    return Array.from(formSchemeMap.values());
  }

  async findById(
    id: string | number | undefined
  ): Promise<FormScheme | undefined> {
    const [[formScheme]] = await pool.query<FormScheme[]>(
      "SELECT * FROM form_scheme WHERE id = ?",
      [id]
    );

    return formScheme;
  }
}
