import formService from "../service/form-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class FormController {
  findAll = asyncErrorHandler(async (req, res) => {
    const forms = await formService.findAll();

    res.status(200).json({
      forms,
    });
  });

  save = asyncErrorHandler(async (req, res) => {
    const form = await formService.save({
      ...req.body,
      user_id: req.decodedToken?.id,
    });

    res.status(200).json({
      message: "form created successfully",
      form,
    });
  });
}

const formController = new FormController();

export default formController;
