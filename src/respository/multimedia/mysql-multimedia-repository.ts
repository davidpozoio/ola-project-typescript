import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Multimedia } from "../../types/multimedia";
import MultimediaRepository from "./multimedia-repository";

export default class MysqlMultimediaRepository extends MultimediaRepository {
  async save(media: Multimedia): Promise<Multimedia> {
    const [createdMedia] = await pool.query<ResultSetHeader>(
      "INSERT INTO multimedia (name, hash, users_id) VALUES (?, ?, ?)",
      [media.name, media.hash, media.user_id]
    );

    return {
      id: createdMedia.insertId,
      hash: media.hash,
      name: media.name,
      user_id: media.user_id,
    } as Multimedia;
  }

  async deleteById(id: string | number | undefined): Promise<Multimedia> {
    const [media] = await pool.query<ResultSetHeader>(
      "DELETE FROM multimedia WHERE id = ?",
      [id]
    );

    return {
      id,
    } as Multimedia;
  }

  async deleteByHash(hash: string): Promise<Multimedia> {
    const [media] = await pool.query<ResultSetHeader>(
      "DELETE FROM multimedia WHERE hash = ?",
      [hash]
    );

    return {
      hash,
    } as Multimedia;
  }
}
