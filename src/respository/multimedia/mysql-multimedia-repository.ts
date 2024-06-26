import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Multimedia } from "../../types/multimedia";
import MultimediaRepository from "./multimedia-repository";

export default class MysqlMultimediaRepository extends MultimediaRepository {
  async save(media: Multimedia): Promise<Multimedia> {
    const [createdMedia] = await pool.query<ResultSetHeader>(
      "INSERT INTO multimedia (name, hash, user_id, type) VALUES (?, ?, ?, ?)",
      [media.name, media.hash, media.user_id, media.type]
    );

    return {
      id: createdMedia.insertId,
      hash: media.hash,
      name: media.name,
      user_id: media.user_id,
      type: media.type,
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

  async deleteByHash(hash: string): Promise<Multimedia | undefined> {
    const [media] = await pool.query<ResultSetHeader>(
      "DELETE FROM multimedia WHERE hash = ?",
      [hash]
    );

    if (media.affectedRows === 0) {
      return undefined;
    }

    return {
      hash,
    } as Multimedia;
  }

  async findByHash(hash: string): Promise<Multimedia | undefined> {
    const [[media]] = await pool.query<Multimedia[]>(
      "SELECT * FROM multimedia WHERE hash = ?",
      [hash]
    );

    return media;
  }
}
