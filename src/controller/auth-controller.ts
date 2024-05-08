import ERRORS from "../const/errors";
import authService from "../service/auth-service";
import blacklistService from "../service/blacklist-service";
import { Blacklist } from "../types/blacklist";
import { TokenPayload } from "../types/token";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { createTokenCookie, removeTokenCookie } from "../utils/cookie-utils";
import HttpError from "../utils/http-error";

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

  logout = asyncErrorHandler(async (req, res) => {
    const cookieJwt = req.cookieJwt as string;
    const decodedToken = req.decodedToken as TokenPayload;

    await authService.logout({
      user_id: decodedToken.id,
      token: cookieJwt,
    } as Blacklist);

    removeTokenCookie(res);

    res.json({
      message: "you are logout!",
    });
  });
}

const authController = new AuthController();

export default authController;
