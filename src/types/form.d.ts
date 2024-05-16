import { RowDataPacket } from "mysql2";

export interface Form extends RowDataPacket {
  id: string | number | undefined;
  label: string;
  form_groups: FormGroup[];
}
