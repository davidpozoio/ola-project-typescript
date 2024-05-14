import { RowDataPacket } from "mysql2";

export interface Result extends RowDataPacket {
  id: number | string | undefined;
  user_id: number | string;
  field_id: number | string;
}