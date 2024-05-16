import formSchemeService from "../service/form-scheme-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class FormSchemeController {
  findAll = asyncErrorHandler(async (req, res) => {
    const formSchemes = await formSchemeService.findAll();

    res.status(200).json({
      form_schemes: formSchemes,
    });
  });
}

const formSchemeController = new FormSchemeController();

export default formSchemeController;
