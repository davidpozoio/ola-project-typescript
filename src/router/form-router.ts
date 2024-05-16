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
    checkRole([Roles.admin, Roles.sales]),
    [
      body("form_scheme_id")
        .isNumeric()
        .withMessage("form_scheme_id is required"),
    ],
    formController.save
  );

export default formRouter;
