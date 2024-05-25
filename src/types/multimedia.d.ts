import { RowDataPacket } from "mysql2";

export interface Multimedia extends RowDataPacket {
  id: string | number | undefined;
  name: string;
  hash: string;
  user_id: string | number | undefined;
}
