import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import HttpError from "../utils/http-error";
import ENV from "../const/env";

type GlobalErrorController = (
  error: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

const globalErrorController: GlobalErrorController = async (
  error,
  req,
  res,
  next
) => {
  if (Array.isArray(error)) {
    console.log(error);
    res.status(400).json({
      message: "the body is not correct",
      errors: error,
    });
    return;
  }
  if (error instanceof HttpError) {
    error.isOperational = undefined;
    res.status(error.statusCode).json({
      error,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(400).json({
      message: error.message,
      error: ENV.MODE === "prod" ? undefined : error,
    });
    return;
  }

  res.status(400).json({
    message: "error",
  });
};

export default globalErrorController;
