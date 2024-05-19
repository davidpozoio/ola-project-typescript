import { Router } from "express";
import requireAuth from "../middleware/require-auth";
import formController from "../controller/form-controller";
import { body } from "express-validator";
import checkRole from "../middleware/check-role";
import { Roles } from "../types/user";
import requireLinkHash from "../middleware/require-link-hash";

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

formRouter
  .route("/generate-link")
  .post(
    [body("id").isNumeric().withMessage("id is required")],
    formController.generateLink
  );

formRouter
  .route("/generate-form/:hash")
  .get(requireLinkHash, formController.generateForm);

formRouter
  .route("/invalidate-link")
  .post(
    [body("id").isNumeric().withMessage("id is required")],
    formController.invalidateLink
  );

export default formRouter;
