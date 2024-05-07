import ERRORS from "../const/errors";
import userService from "../service/user-service";
import { Roles } from "../types/user";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import HttpError from "../utils/http-error";

export default function checkRole(roles: Roles[]) {
  return asyncErrorHandler(async (req, res, next) => {
    const decodedToken = req.decodedToken;

    const user = await userService.findById(decodedToken?.id);

    if (!roles.includes(user?.role as Roles)) {
      throw new HttpError(ERRORS.UNAUTHORIZED);
    }

    next();
  });
}
