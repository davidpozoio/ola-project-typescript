import { Router } from "express";
import resultController from "../controller/result-controller";
import { body } from "express-validator";

const resultRouter = Router();

resultRouter.route("/").get(resultController.findAllResults);
resultRouter
  .route("/")
  .post(
    [
      body("user_id").isNumeric().withMessage("user_id is required"),
      body("field_id").isNumeric().withMessage("field_id is required"),
      body("response").isObject().withMessage("response is required"),
    ],
    resultController.addResponse
  );

export default resultRouter;
