import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

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
  res.status(400).json({
    error,
  });
};

export default globalErrorController;
