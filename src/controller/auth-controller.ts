import authService from "../service/auth-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { createTokenCookie } from "../utils/cookie-utils";

class AuthController {
  signup = asyncErrorHandler(async (req, res) => {
    const user = await authService.signup(req.body);
    user.password = undefined;

    await createTokenCookie(res, { id: user.id });

    res.status(200).json({
      message: "user created successfully",
      user,
    });
  });

  login = asyncErrorHandler(async (req, res) => {
    const user = await authService.login(req.body);
    await createTokenCookie(res, { id: user.id });

    res.status(200).json({
      messsage: "user authenticated!",
      user,
    });
  });
}

const authController = new AuthController();

export default authController;
