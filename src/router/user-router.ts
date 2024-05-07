import { Router } from "express";
import userController from "../controller/user-controller";

const userRouter = Router();

userRouter.route("/").get(userController.findAll);

export default userRouter;
