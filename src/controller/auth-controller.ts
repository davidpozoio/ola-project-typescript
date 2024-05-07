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
}

const authController = new AuthController();

export default authController;
