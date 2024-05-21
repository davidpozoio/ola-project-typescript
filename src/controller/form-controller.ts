import formSchemeService from "../service/form-scheme-service";
import formService from "../service/form-service";
import { Form } from "../types/form";
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

  generateLink = asyncErrorHandler(async (req, res) => {
    const form = await formService.addHash(req.body);
    res.status(200).json({
      form,
    });
  });

  generateForm = asyncErrorHandler(async (req, res) => {
    const form = await formService.findById(req.formId);
    const formScheme = await formSchemeService.findById(form.form_scheme_id);
    res.status(200).json({
      form,
      form_scheme: formScheme,
    });
  });

  invalidateLink = asyncErrorHandler(async (req, res) => {
    const { id } = req.body;

    await formService.removeHash(id);

    res.status(200).json({
      message: "the link is invalid now",
    });
  });

  setExpireTime = asyncErrorHandler(async (req, res) => {
    const decodedToken = req.decodedToken;
    const form = await formService.setExpireTime({
      id: req.body.id,
      expire_hash_time: req.body.expire_hash_time,
      user_id: decodedToken?.id,
    } as Form);

    res.status(200).json({
      form,
    });
  });
}

const formController = new FormController();

export default formController;
