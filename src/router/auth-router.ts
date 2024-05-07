import { Router } from "express";
import authController from "../controller/auth-controller";
import { body } from "express-validator";
import { UserArea } from "../types/user";

const authRouter = Router();

authRouter
  .route("/signup")
  .post(
    [
      body("fullname").isString(),
      body("email").isEmail(),
      body("password").isString(),
      body("area").isIn(Object.values(UserArea)),
    ],
    authController.signup
  );

authRouter
  .route("/login")
  .post(
    [body("email").isEmail(), body("password").isString()],
    authController.login
  );

export default authRouter;
