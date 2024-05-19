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

export default resultRouter;
