import { Router } from "express";
import formSchemeController from "../controller/form-scheme-controller";

const formSchemeRouter = Router();

formSchemeRouter.route("/").get(formSchemeController.findAll);
formSchemeRouter.route("/:id").get(formSchemeController.findById);

export default formSchemeRouter;
