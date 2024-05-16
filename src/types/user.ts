import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: string | number | undefined;
  email: string;
  fullname: string;
  password: string | undefined;
  area: UserArea;
  role: Roles;
  has_access: boolean;
}

export enum UserArea {
  admin = "admin",
  commercial = "Asesor comercial",
  design = "Diseño",
  communityManager = "Community manager",
  photograph = "Fotógrafo",
  telemarketing = "Telemarketing",
  secretary = "secretaría",
}

export enum Roles {
  admin = "admin",
  user = "user",
  sales = "sales",
}
