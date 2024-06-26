import { Router } from "express";
import authController from "../controller/auth-controller";
import { body } from "express-validator";
import { UserArea } from "../types/user";
import requireAuth from "../middleware/require-auth";
import requireAccess from "../middleware/require-access";

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

authRouter.route("/me").get(requireAuth, authController.athenticate);

authRouter
  .route("/verify")
  .get(requireAuth, requireAccess, authController.verify);

authRouter.route("/logout").get(requireAuth, authController.logout);

export default authRouter;
