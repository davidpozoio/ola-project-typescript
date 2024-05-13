import { Router } from "express";
import fieldController from "../controller/field-controller";
import { body } from "express-validator";

const fieldRouter = Router();

fieldRouter.route("/").patch(
  [
    body("id").isNumeric().withMessage("id is required"),
    body("metadata").custom((value) => {
      if (value.result) {
        return value.result;
      }
      return true;
    }),
  ],
  fieldController.updateResult
);

export default fieldRouter;
