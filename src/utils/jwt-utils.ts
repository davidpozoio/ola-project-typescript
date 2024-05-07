import jwt from "jsonwebtoken";
import ENV from "../const/env";

export async function createToken(payload: object) {
  if (!ENV.SECRET) {
    throw new Error("secret not provided");
  }
  return jwt.sign(payload, ENV.SECRET, { expiresIn: "1d" });
}

export async function verifyToken(token: string) {
  if (!ENV.SECRET) {
    throw new Error("secret not provided");
  }
  return jwt.verify(token, ENV.SECRET);
}

export async function verifyTokenUser(token: string) {
  const decodedToken = await verifyToken(token);
  return decodedToken as { id: number };
}
