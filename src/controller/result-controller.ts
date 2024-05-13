import resultService from "../service/result-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class ResultController {
  findAllResults = asyncErrorHandler(async (req, res) => {
    const results = await resultService.findAllUserResults(req.body);
    res.status(200).json({
      results,
    });
  });
}

const resultController = new ResultController();

export default resultController;
