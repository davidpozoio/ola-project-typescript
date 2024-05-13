import { Router } from "express";
import resultController from "../controller/result-controller";

const resultRouter = Router();

resultRouter.route("/").get(resultController.findAllResults);

export default resultRouter;
