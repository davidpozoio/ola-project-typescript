import ERRORS from "../const/errors";
import userService from "../service/user-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import HttpError from "../utils/http-error";

const requireVerification = asyncErrorHandler(async (req, res, next) => {
  const decodedToken = req.decodedToken;
  const user = await userService.findById(decodedToken?.id);

  if (!user.verified) {
    throw new HttpError(ERRORS.USER_NOT_VERIFIED);
  }

  next();
});

export default requireVerification;
