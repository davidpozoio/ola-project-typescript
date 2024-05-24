import resultService from "../service/result-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class ResultController {
  findAllResults = asyncErrorHandler(async (req, res) => {
    const results = await resultService.findAllUserResults(req.body);
    res.status(200).json({
      results,
    });
  });

  addResponse = asyncErrorHandler(async (req, res) => {
    const result = await resultService.addResponse(req.body);

    res.status(200).json({
      message: "response added!",
      result,
    });
  });

  addMultipleResponses = asyncErrorHandler(async (req, res) => {
    const { results, hash, id } = req.body;

    const createdResults = await resultService.addMultipleResponse(
      results,
      hash,
      id
    );

    res.status(200).json({
      message: "form submitted!",
      results: createdResults,
    });
  });
}

const resultController = new ResultController();

export default resultController;
