import DocumentRepository from "../respository/document/document-repository";
import MysqlDocumentRepository from "../respository/document/document-repository-mysql";
import { Owner } from "../respository/repository";
import { Document } from "../types/documents";

class DocumentService extends DocumentRepository {
  constructor(private readonly documentRepository: DocumentRepository) {
    super();
  }

  save(document: Document): Promise<Document> {
    return this.documentRepository.save(document);
  }

  async transformFiles(files: Express.Multer.File[]): Promise<Document> {
    const paths = files.map((file) => file.filename);

    return {
      name_card_front: paths[0],
      name_card_back: paths[1],
      name_video: paths[2],
    } as Document;
  }
}

const documentService = new DocumentService(new MysqlDocumentRepository());

export default documentService;
