import { ResultSetHeader } from "mysql2";
import pool from "../config/mysql-config";
import { Field, FormGroup, FormScheme } from "../types/form-scheme";

interface FormSchemeCreationDto {
  id: string | number;
  label: string;
}

interface FormGroupCreationDto {
  label: string;
  form_scheme_id: number | string;
}

interface FieldCreationDto {
  form_group_id: number | string;
  label: string;
  component: string;
  metadata: {
    type: string;
    options?: Option[];
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

export async function createFormGroup(form: FormGroup): Promise<FormGroup> {
  const [formData] = await pool.query<ResultSetHeader>(
    "INSERT INTO form_group ( label, form_scheme_id) VALUES (?, ?)",
    [form.label, form.form_scheme_id]
  );

  return {
    id: formData.insertId,
    label: form.label,
    fields: form.fields,
  } as FormGroup;
}

export async function createFields(field: Field) {
  const [fieldData] = await pool.query<ResultSetHeader>(
    "INSERT INTO field (label, component, metadata, form_group_id) VALUES (?, ?, ?, ?)",
    [
      field.label,
      field.component,
      JSON.stringify(field.metadata),
      field.form_group_id,
    ]
  );
}

export async function createFormSchemeJson(formScheme: FormScheme) {
  await createFormScheme({
    id: formScheme.id as number,
    label: formScheme.label,
  });

  for (let formGroup of formScheme.form_groups) {
    const createdFormGroup = await createFormGroup({
      label: formGroup.label,
      form_scheme_id: formScheme.id as number,
      fields: formGroup.fields,
    } as FormGroup);

    for (let field of createdFormGroup.fields) {
      await createFields({
        label: field.label,
        form_group_id: createdFormGroup.id,
        component: field.component,
        metadata: field.metadata,
      } as Field);
    }
  }
}
