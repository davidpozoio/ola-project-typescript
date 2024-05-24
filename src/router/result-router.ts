import { Router } from "express";
import resultController from "../controller/result-controller";
import { body } from "express-validator";
import requireVerification from "../middleware/require-verification";
import requireAuth from "../middleware/require-auth";

const resultRouter = Router();

resultRouter
  .route("/")
  .get(requireAuth, requireVerification, resultController.findAllResults);

resultRouter.route("/").put(
  [
    body("form_id").isNumeric().withMessage("form_id is required"),
    body("field_id").isNumeric().withMessage("field_id is required"),
    body("response")
      .isObject()
      .withMessage("response is required")
      .custom((response) => {
        if (!response.value) {
          return 0;
        }
        return 1;
      })
      .withMessage("value in response is required"),
  ],
  resultController.addResponse
);

resultRouter.route("/all").put(
  [
    body("hash").isString().optional(),
    body("id").isNumeric().withMessage("id is required"),
    body("results")
      .isArray()
      .withMessage("results is required")
      .custom((results) => {
        console.log(results);
        for (let result of results) {
          if (!result.field_id && typeof result.field_id !== "string") {
            return 0;
          }
          if (!result.response && typeof result.response !== "object") {
            return 0;
          }

          if (
            !result.response.value &&
            typeof result.response.value !== "string"
          ) {
            return 0;
          }
        }

        return 1;
      })
      .withMessage("the result needs a field_id and a response with a value"),
  ],
  resultController.addMultipleResponses
);

export default resultRouter;
