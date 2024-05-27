import express from "express";
import path from "path";
import cookiParser from "cookie-parser";
import cors from "cors";

import globalErrorController from "./controller/global-error-controller";
import ENV from "./const/env";
import userRouter from "./router/user-router";
import authRouter from "./router/auth-router";
import resultRouter from "./router/result-router";
import formSchemeRouter from "./router/form-scheme-router";
import formRouter from "./router/form-router";
import multimediaRouter from "./router/multimedia-router";
import fieldRouter from "./router/field-router";

const app = express();

app.use(express.json());
app.use(cookiParser());
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:5173"],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.use("/", express.static(path.resolve(__dirname, "static", "dist")));

app.use(`${ENV.API_PREFIX}/multimedia`, multimediaRouter);

app.use(`${ENV.API_PREFIX}/users`, userRouter);
app.use(`${ENV.API_PREFIX}/`, authRouter);
app.use(`${ENV.API_PREFIX}/form-schemes`, formSchemeRouter);
app.use(`${ENV.API_PREFIX}/forms`, formRouter);
app.use(`${ENV.API_PREFIX}/fields`, fieldRouter);
app.use(`${ENV.API_PREFIX}/results`, resultRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "route not found",
  });
});

app.use(globalErrorController);

export default app;
