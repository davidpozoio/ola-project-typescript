import { RowDataPacket } from "mysql2";

export interface Form extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  form_groups: FormGroup[];
}

export interface FormGroup extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  fields: Field[];
}

export interface Field extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  metadata: object;
}
