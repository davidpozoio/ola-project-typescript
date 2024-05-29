import { Router } from "express";
import requireAuth from "../middleware/require-auth";
import documentController from "../controller/document-controller";

const documentRouter = Router();

documentRouter
  .route("/")
  .post(
    requireAuth,
    /* uploadFile.array("files", 3), */ documentController.save
  );

export default documentRouter;
