import ERRORS from "../const/errors";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import HttpError from "../utils/http-error";

const requireAccess = asyncErrorHandler(async (req, res, next) => {
  if (!req.user?.has_access) {
    throw new HttpError(ERRORS.USER_DOES_NOT_HAVE_ACCESS);
  }

  next();
});

export default requireAccess;
