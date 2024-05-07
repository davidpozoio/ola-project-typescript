import { Router } from "express";
import userController from "../controller/user-controller";
import requireAuth from "../middleware/require-auth";

const userRouter = Router();

userRouter.route("/").get(requireAuth, userController.findAll);

export default userRouter;
