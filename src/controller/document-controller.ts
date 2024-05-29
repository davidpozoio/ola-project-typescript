import documentService from "../service/document-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class DocumentController {
  save = asyncErrorHandler(async (req, res) => {
    const files = req.files;

    const document = await documentService.transformFiles(
      files as Express.Multer.File[]
    );
    document.user_id = req.decodedToken?.id as number;
    const createdDocument = await documentService.save(document);

    res.status(200).json({
      message: "documents saved!",
      document: createdDocument,
    });
  });
}

const documentController = new DocumentController();

export default documentController;
