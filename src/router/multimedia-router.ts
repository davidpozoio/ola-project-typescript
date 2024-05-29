import express from "express";

import multimediaController from "../controller/multimedia-controller";
import requireAuth from "../middleware/require-auth";
import { uploadImage } from "../config/multer-config";
import { uploadVideo } from "../config/multer-config-video";

const multimediaRouter = express.Router();

multimediaRouter.use("/", express.static("multimedia"));

multimediaRouter
  .route("/user-card")
  .post(
    requireAuth,
    uploadImage.array("userCard"),
    multimediaController.saveCardImages
  );

multimediaRouter
  .route("/video")
  .post(
    requireAuth,
    uploadVideo.single("video"),
    multimediaController.saveVideo
  );

multimediaRouter
  .route("/:hash")
  .delete(requireAuth, multimediaController.deleteByHash);

export default multimediaRouter;
