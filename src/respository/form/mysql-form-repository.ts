import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Form } from "../../types/form";
import { FormRepository } from "./form-repository";
import { Owner } from "../repository";

export class MysqlFormRepository extends FormRepository {
  async findAll(): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>({
      sql: `SELECT * from form`,
    });

    return forms;
  }

  async save(form: Form): Promise<Form> {
    const [createdForm] = await pool.query<ResultSetHeader>(
      "INSERT INTO form (done, hash, form_scheme_id, user_id) VALUES (?, ?, ?, ?)",
      [false, null, form.form_scheme_id, form.user_id]
    );

    return {
      id: createdForm.insertId,
      done: false,
      hash: null,
      form_scheme_id: form.form_scheme_id,
      user_id: form.user_id,
    } as Form;
  }

  async addHash(form: Form): Promise<Form> {
    const [updatedForm] = await pool.query<ResultSetHeader>(
      "UPDATE form SET hash = ? WHERE id = ?",
      [form.hash, form.id]
    );

    return {
      id: form.id,
      hash: form.hash,
    } as Form;
  }

  async findById(
    id: string | number | undefined,
    owner?: Owner
  ): Promise<Form | undefined> {
    if (owner) {
      const [[form]] = await pool.query<Form[]>(
        "SELECT * FROM form WHERE id = ? AND user_id",
        [id, owner.id]
      );
      return form;
    }
    const [[form]] = await pool.query<Form[]>(
      "SELECT * FROM form WHERE id = ?",
      [id]
    );

    return form;
  }

  async findByHash(hash: string): Promise<Form | undefined> {
    const [[form]] = await pool.query<Form[]>(
      "SELECT * FROM form WHERE hash = ?",
      [hash]
    );

    return form;
  }

  async removeHash(id: string | number): Promise<Form | undefined> {
    const [form] = await pool.query<ResultSetHeader>(
      "UPDATE form SET hash = null WHERE id = ?",
      [id]
    );

    return {
      id: id,
      hash: null,
    } as Form;
  }

  async setExpireTime(form: Form): Promise<Form | undefined> {
    await pool.query(
      "UPDATE form SET expire_hash_time = ? WHERE id = ? AND user_id = ?",
      [form.expire_hash_time, form.id, form.user_id]
    );

    return {
      id: form.id,
      expire_hash_time: form.expire_hash_time,
    } as Form;
  }

  async findAllByUserId(id: string | number): Promise<Form[]> {
    const [forms] = await pool.query<Form[]>(
      "SELECT * FROM form WHERE user_id = ?",
      [id]
    );

    return forms;
  }

  async findByFormSchemeId(
    formSchemeId: string | number,
    owner?: Owner
  ): Promise<Form | undefined> {
    if (owner) {
      const [[form]] = await pool.query<Form[]>(
        "SELECT * FROM form WHERE form_scheme_id = ? AND user_id = ?",
        [formSchemeId, owner.id]
      );

      return form;
    }

    const [[form]] = await pool.query<Form[]>(
      "SELECT * FROM form WHERE form_scheme_id = ?",
      [formSchemeId]
    );

    return form;
  }

  async updateDone(
    id: number,
    done: boolean,
    owner?: Owner | undefined
  ): Promise<Form | undefined> {
    const query = owner
      ? "UPDATE form SET done = ? WHERE id = ? AND user_id = ?"
      : "UPDATE form SET done = ? WHERE id = ? ";

    const params = owner ? [done, id, owner.id] : [id];

    const [updatedForm] = await pool.query<ResultSetHeader>(query, params);

    if (updatedForm.affectedRows === 0) {
      return undefined;
    }

    return {
      id,
      done,
      user_id: owner?.id,
    } as Form;
  }
}
