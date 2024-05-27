import fieldService from "../service/field-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class FieldController {
  updateResult = asyncErrorHandler(async (req, res) => {
    const field = await fieldService.updateResult(req.body);
    res.status(200).json({
      message: "field updated successfully",
      field,
    });
  });

  getAllFieldsOfForm = asyncErrorHandler(async (req, res) => {
    const fields = await fieldService.findAllBySchemeId(2, { id: 1 });

    res.status(200).json({
      fields,
    });
  });
}

const fieldController = new FieldController();

export default fieldController;
