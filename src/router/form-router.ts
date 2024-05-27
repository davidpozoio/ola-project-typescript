import { Router } from "express";
import requireAuth from "../middleware/require-auth";
import formController from "../controller/form-controller";
import { body } from "express-validator";
import checkRole from "../middleware/check-role";
import { Roles } from "../types/user";
import requireLinkHash from "../middleware/require-link-hash";

const formRouter = Router();

formRouter
  .route("/")
  .get(
    requireAuth,
    checkRole([Roles.admin, Roles.sales]),
    formController.findAll
  );
formRouter.route("/user-form").get(requireAuth, formController.getUserForm);
formRouter.route("/:id").get(requireAuth, formController.findById);

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
  .route("/expire-time")
  .post(
    requireAuth,
    [
      body("expire_hash_time")
        .isNumeric()
        .withMessage("expire_hash_time is required"),
      body("id").isNumeric().withMessage("id is required"),
    ],
    formController.setExpireTime
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

formRouter
  .route("/verify-form")
  .post(
    requireAuth,
    [body("id").isNumeric().withMessage("id is required")],
    formController.verifyForm
  );

export default formRouter;
