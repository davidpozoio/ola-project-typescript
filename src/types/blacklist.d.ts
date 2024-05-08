import { RowDataPacket } from "mysql2";

export interface Blacklist extends RowDataPacket {
  id: number | string | undefined;
  token: string;
  user_id: number | string;
}
