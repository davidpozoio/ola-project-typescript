import { RowDataPacket } from "mysql2";
import pool from "../../config/mysql-config";
import { Field, FormGroup, FormScheme } from "../../types/form-scheme";
import FormSchemeRepository from "./form-scheme-repository";
import getNestedTables from "../../utils/get-nested-tables";

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

    const values = await getNestedTables<FormColums>(
      forms,
      [
        { nameTable: "form_group", foreingTableName: "form_scheme" },
        { nameTable: "field", foreingTableName: "form_group" },
      ],
      {
        recoverFrom: "form_scheme",
      }
    );

    return values;
  }

  async findById(
    id: string | number | undefined
  ): Promise<FormScheme | undefined> {
    const [forms] = await pool.query<FormColums[]>(
      {
        sql: `
      SELECT form_scheme.*, form_group.*, field.* from form_scheme 
        LEFT JOIN form_group 
        ON form_group.form_scheme_id = form_scheme.id
        LEFT JOIN field
        ON field.form_group_id = form_group.id
        WHERE form_scheme.id = ?`,
        nestTables: true,
      },
      [id]
    );

    const values = await getNestedTables<FormColums>(
      forms,
      [
        { nameTable: "form_group", foreingTableName: "form_scheme" },
        { nameTable: "field", foreingTableName: "form_group" },
      ],
      {
        recoverFrom: "form_scheme",
      }
    );

    return values[0];
  }
}
