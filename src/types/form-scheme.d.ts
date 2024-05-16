import { RowDataPacket } from "mysql2";

export interface FormScheme extends RowDataPacket {
  id: number | string | undefined;
  label: string;
}
