import { RowDataPacket } from "mysql2";

export interface Result extends RowDataPacket {
  id: number | string | undefined;
  form_id: number | string;
  field_id: number | string;
  response: ResultResponse;
}

export type ResultResponse = { value: string };
