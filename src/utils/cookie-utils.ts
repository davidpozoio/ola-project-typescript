import { Response } from "express";
import NAMES from "../const/names";
import { createToken } from "./jwt-utils";

export async function createTokenCookie(response: Response, payload: object) {
  const token = await createToken(payload);
  response.cookie(NAMES.JWT_AUTH, token, {
    httpOnly: true,
    path: "/",
    secure: true,
  });
}
