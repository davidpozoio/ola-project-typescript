import app from "./app";
import ENV from "./const/env";
import startDB from "./db/db";
import startDefaultValues from "./init/start-default-values";
import testConnection from "./init/test-connection";
import { TokenPayload } from "./types/token";

declare module "express" {
  interface Request {
    cookieJwt?: string;
    decodedToken?: TokenPayload;
    formId?: string | number;
  }
}
///test until database is connected
testConnection().then(async () => {
  await startDB().catch((err) => {
    console.log(err);
  });
  console.log("database initialized!");
  await startDefaultValues().catch((err) => {
    console.log("///////////////////////////////", err);
  });
  app.listen(ENV.PORT, () => {
    console.log(`the server has started in port ${ENV.PORT}`);
  });
});
