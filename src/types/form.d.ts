import { RowDataPacket } from "mysql2";

export interface Form extends RowDataPacket {
  id: string | number | undefined;
  done: boolean;
  hash: null | string;
  user_id: string | number | undefined;
  form_scheme_id: string | undefined | number;
  expire_hash_time: undefined | Date;
}
