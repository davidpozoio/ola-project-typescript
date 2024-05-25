import express from "express";
import { uploadImage } from "../config/multer-config";
import multimediaController from "../controller/multimedia-controller";
import { body } from "express-validator";
import requireAuth from "../middleware/require-auth";

const multimediaRouter = express.Router();

multimediaRouter.use("/", express.static("multimedia"));
multimediaRouter
  .route("/")
  .post(
    requireAuth,
    uploadImage.single("media"),
    [body("name").isString().withMessage("name is required")],
    multimediaController.save
  );

export default multimediaRouter;
