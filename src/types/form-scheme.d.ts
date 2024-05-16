import { RowDataPacket } from "mysql2";

export interface FormScheme extends RowDataPacket {
  id: number | string | undefined;
  label: string;
  form_groups: FormGroup[];
}

export interface FormGroup extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  form_scheme_id: string | number | undefined;
  fields: Field[];
}

export interface Field extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  form_group_id: string | number | undefined;
  metadata: object;
}
