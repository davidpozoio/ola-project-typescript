import formSchemeService from "../service/form-scheme-service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class FormSchemeController {
  findAll = asyncErrorHandler(async (req, res) => {
    const formSchemes = await formSchemeService.findAll();

    res.status(200).json({
      form_schemes: formSchemes,
    });
  });

  findById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const formScheme = await formSchemeService.findById(id);

    res.status(200).json({
      form_scheme: formScheme,
    });
  });
}

const formSchemeController = new FormSchemeController();

export default formSchemeController;
