import { RowDataPacket } from "mysql2";

export interface Form extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  user_id: string | number | undefined;
  form_groups: FormGroup[];
}

export interface FormGroup {
  id: string | number | undefined;
  label: string;
  fields: Field[];
}

export interface Field {
  id: string | number | undefined;
  label: string;
  metadata: object;
}
