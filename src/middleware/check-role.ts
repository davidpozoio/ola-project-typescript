import { Roles } from "../types/user";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export default async function checkRole(roles: Roles[]) {
  asyncErrorHandler(async (req, res, next) => {
    const decodedToken = req.decodedToken;
  });
}
