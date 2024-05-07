import app from "./app";
import ENV from "./const/env";
import startDB from "./db/db";
import { TokenPayload } from "./types/token";

declare module "express" {
  interface Request {
    cookieJwt?: string;
    decodedToken?: TokenPayload;
  }
}

startDB().then(() => {
  console.log("connecting database...");
});

app.listen(ENV.PORT, () => {
  console.log(`the server has started in port ${ENV.PORT}`);
});
