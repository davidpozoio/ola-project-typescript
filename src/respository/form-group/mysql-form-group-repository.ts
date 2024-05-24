import pool from "../../config/mysql-config";
import { FormGroup } from "../../types/form-scheme";
import FormGroupRepository from "./form-group-repository";

export default class MysqlFormGroupRepository extends FormGroupRepository {
  async findById(
    id: string | number | undefined
  ): Promise<FormGroup | undefined> {
    const [[formGroup]] = await pool.query<FormGroup[]>(
      "SELECT * FROM form_group WHERE id = ?",
      [id]
    );

    return formGroup;
  }
}
