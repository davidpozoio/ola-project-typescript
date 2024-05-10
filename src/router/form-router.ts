import { Router } from "express";
import requireAuth from "../middleware/require-auth";
import formController from "../controller/form-controller";
import { body } from "express-validator";
import checkRole from "../middleware/check-role";
import { Roles } from "../types/user";

const formRouter = Router();

formRouter.route("/").get(requireAuth, formController.findAll);
formRouter
  .route("/")
  .post(
    requireAuth,
    checkRole([Roles.admin]),
    [body("label").isString().withMessage("label is required")],
    formController.save
  );

export default formRouter;
