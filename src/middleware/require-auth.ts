import ERRORS from "../const/errors";
import NAMES from "../const/names";
import userService from "../service/user-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import HttpError from "../utils/http-error";
import { verifyTokenUser } from "../utils/jwt-utils";

const requireAuth = asyncErrorHandler(async (req, res, next) => {
  const cookieJwt = req.cookies?.[NAMES.JWT_AUTH];
  if (!cookieJwt) {
    throw new HttpError(ERRORS.JWT_NOT_PROVIDED);
  }

  const decodedToken = await verifyTokenUser(cookieJwt);
  const user = await userService.findById(decodedToken.id);

  if (!user) {
    throw new HttpError(ERRORS.USER_NOT_FOUND);
  }

  req.cookieJwt = cookieJwt;
  req.decodedToken = decodedToken;

  next();
});

export default requireAuth;
