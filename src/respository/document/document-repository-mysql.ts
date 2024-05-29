import { ResultSetHeader } from "mysql2";
import pool from "../../config/mysql-config";
import { Document } from "../../types/documents";
import DocumentRepository from "./document-repository";

export default class MysqlDocumentRepository extends DocumentRepository {
  async save(document: Document): Promise<Document> {
    const [createdDocument] = await pool.query<ResultSetHeader>(
      "INSERT INTO document (name_card_front, name_card_back, name_video, user_id) VALUES (?, ?, ?, ?)",
      [
        document.name_card_front,
        document.name_card_back,
        document.name_video,
        document.user_id,
      ]
    );

    return {
      ...document,
      id: createdDocument.insertId,
    } as Document;
  }
}
