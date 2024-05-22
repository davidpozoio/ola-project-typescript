import { ResultSetHeader } from "mysql2";
import pool from "../config/mysql-config";

interface FormSchemeCreationDto {
  id: string | number;
  label: string;
}

interface FormGroupCreationDto {
  label: string;
}

interface FieldCreationDto {
  label: string;
  component: string;
  metadata: {
    type: string;
    options: Option[];
  };
}

interface Option {
  value: string;
  label: string;
}

export async function createFormScheme(form: FormSchemeCreationDto) {
  await pool.query("INSERT INTO form_scheme (id, label) VALUES (?, ?)", [
    form.id,
    form.label,
  ]);

  return form;
}

export async function createFormGroup(form: FormGroupCreationDto) {
  const [formData] = await pool.query<ResultSetHeader>(
    "INSERT INTO form_group ( label) VALUES (?)",
    [form.label]
  );

  return {
    id: formData.insertId,
    form: form.label,
  };
}

export async function createFields(field: FieldCreationDto) {
  const [fieldData] = await pool.query<ResultSetHeader>(
    "INSERT INTO field (label, component, metadata) VALUES (?, ?, ?)",
    [field.label, field.component, JSON.stringify(field.metadata)]
  );

  return {
    id: fieldData.insertId,
    ...field,
  };
}
