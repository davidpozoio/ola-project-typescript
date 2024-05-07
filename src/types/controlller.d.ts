import { Request, Response, NextFunction } from "express";

type Controller = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

export default Controller;
