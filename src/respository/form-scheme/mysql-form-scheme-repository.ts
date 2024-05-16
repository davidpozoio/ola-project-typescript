import pool from "../../config/mysql-config";
import { FormScheme } from "../../types/form-scheme";
import FormSchemeRepository from "./form-scheme-repository";

export default class MysqlFormSchemeRepository extends FormSchemeRepository {
  async findAll(): Promise<FormScheme[]> {
    const [formSchemes] = await pool.query<FormScheme[]>(
      "SELECT * FROM form_scheme"
    );
    return formSchemes;
  }
}
