import Controller from "../types/controlller";
import { Request, Response, NextFunction } from "express";

const asyncErrorHandler = (controller: Controller) => {
  return (request: Request, response: Response, next: NextFunction) => {
    controller(request, response, next).catch((err) => {
      next(err);
    });
  };
};

export default asyncErrorHandler;
