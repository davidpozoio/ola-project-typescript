import { Router } from "express";
import userController from "../controller/user-controller";
import requireAuth from "../middleware/require-auth";
import checkRole from "../middleware/check-role";
import { Roles } from "../types/user";

const userRouter = Router();

userRouter
  .route("/")
  .get(requireAuth, checkRole([Roles.admin]), userController.findAll);

export default userRouter;
