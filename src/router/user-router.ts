import { Router } from "express";
import userController from "../controller/user-controller";
import requireAuth from "../middleware/require-auth";
import checkRole from "../middleware/check-role";
import { Roles } from "../types/user";
import { body } from "express-validator";

const userRouter = Router();

userRouter
  .route("/")
  .get(requireAuth, checkRole([Roles.admin]), userController.findAll);

userRouter
  .route("/notifications")
  .get(
    requireAuth,
    checkRole([Roles.admin]),
    userController.findAllNotifications
  );

userRouter
  .route("/toggle-access")
  .post(
    [body("userId").isNumeric(), body("access").isBoolean()],
    requireAuth,
    checkRole([Roles.admin]),
    userController.toggleAccessUser
  );

export default userRouter;
