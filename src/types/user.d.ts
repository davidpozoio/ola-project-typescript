import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string | number | undefined;
  email: string;
  username: string;
  password: string | undefined;
  area: UserArea;
}

export enum UserArea {
  commercial = "Asesor comercial",
  design = "Diseño",
  communityManager = "Community manager",
  photograph = "Fotógrafo",
  telemarketing = "Telemarketing",
  secretary = "secretaría",
}
