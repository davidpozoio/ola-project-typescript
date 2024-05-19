import crypto from "crypto";
import ENV from "../const/env";

export function generateHmacHash(data: object) {
  const hmac = crypto.createHmac("sha1", ENV.SECRET as string);
  hmac.write(JSON.stringify(data));
  hmac.end();

  return hmac.read().toString("hex");
}

export function verifyHmacHash(data: object, compareHash: string) {
  const hmac = crypto.createHmac("sha1", ENV.SECRET as string);
  hmac.write(JSON.stringify(data));
  hmac.end();

  const hash = hmac.read().toString("hex");

  return hash === compareHash;
}
