import jwt from "jsonwebtoken";
import ENV from "../const/env";

export async function createToken(payload: object) {
  if (!ENV.SECRET) {
    throw new Error("secret not provided");
  }
  return jwt.sign(payload, ENV.SECRET, { expiresIn: "1d" });
}
