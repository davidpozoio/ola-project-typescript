import express from "express";
import path from "path";
import cookiParser from "cookie-parser";
import cors from "cors";

import globalErrorController from "./controller/global-error-controller";
import ENV from "./const/env";
import userRouter from "./router/user-router";
import authRouter from "./router/auth-router";

const app = express();

app.use(express.json());
app.use(cookiParser());
app.use(
  cors({
    origin: ["http://localhost:4000"],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.use("/", express.static(path.resolve(__dirname, "static")));

app.use(`${ENV.API_PREFIX}/users`, userRouter);
app.use(`${ENV.API_PREFIX}/`, authRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "route not found",
  });
});

app.use(globalErrorController);

export default app;
