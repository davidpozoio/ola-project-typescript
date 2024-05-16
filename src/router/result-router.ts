import { Router } from "express";
import resultController from "../controller/result-controller";
import { body } from "express-validator";

const resultRouter = Router();

resultRouter.route("/").get(resultController.findAllResults);
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
