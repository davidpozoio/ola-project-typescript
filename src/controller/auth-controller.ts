import authService from "../service/auth-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class AuthController {
  signup = asyncErrorHandler(async (req, res) => {
    const user = await authService.signup(req.body);
    user.password = undefined;
    res.status(200).json({
      message: "user created successfully",
      user,
    });
  });
}

const authController = new AuthController();

export default authController;
