import { Response } from "express";
import NAMES from "../const/names";
import { createToken } from "./jwt-utils";

const tokenDate = new Date();
tokenDate.setDate(tokenDate.getDate() + 1);

const removeDate = new Date(0);

export async function createTokenCookie(response: Response, payload: object) {
  const token = await createToken(payload);
  response.cookie(NAMES.JWT_AUTH, token, {
    httpOnly: true,
    path: "/",
    secure: true,
    expires: tokenDate,
  });
}

export function removeTokenCookie(response: Response) {
  response.cookie(NAMES.JWT_AUTH, "", {
    httpOnly: true,
    path: "/",
    expires: removeDate,
  });
}
