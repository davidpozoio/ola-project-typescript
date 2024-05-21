import { Router } from "express";
import resultController from "../controller/result-controller";
import { body } from "express-validator";
import requireVerification from "../middleware/require-verification";
import requireAuth from "../middleware/require-auth";

const resultRouter = Router();

resultRouter
  .route("/")
  .get(requireAuth, requireVerification, resultController.findAllResults);

resultRouter
  .route("/")
  .post(
    [
      body("form_id").isNumeric().withMessage("form_id is required"),
      body("field_id").isNumeric().withMessage("field_id is required"),
      body("response").isObject().withMessage("response is required"),
    ],
    resultController.addResponse
  );

resultRouter
  .route("/all")
  .post([
    body("hash").isString().optional(),
    body("id").isNumeric().withMessage("id is required"),
    body("results").isArray().withMessage("results is required"),
  ]);

export default resultRouter;
