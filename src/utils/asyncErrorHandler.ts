import Controller from "../types/controlller";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const asyncErrorHandler = (controller: Controller) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }

    controller(request, response, next).catch((err) => {
      next(err);
    });
  };
};

export default asyncErrorHandler;
