import { Router } from "express";
import authController from "../controller/auth-controller";

const authRouter = Router();

authRouter.route("/signup").post(authController.signup);

export default authRouter;
