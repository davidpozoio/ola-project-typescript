import FORM_SCHEMES from "../const/form-schemes-ids";
import formSchemeService from "../service/form-scheme-service";
import formService from "../service/form-service";
import { Form } from "../types/form";
import asyncErrorHandler from "../utils/asyncErrorHandler";

class FormController {
  findAllMyForms = asyncErrorHandler(async (req, res) => {
    const forms = await formService.findAllByUserId(
      req.decodedToken?.id as number
    );

    res.status(200).json({
      forms,
    });
  });

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
    const formScheme = await formSchemeService.findByIdWithResults(
      form.form_scheme_id as number,
      form.id as number
    );
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

  findById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    const form = await formService.findById(id, {
      id: req.decodedToken?.id as number,
    });

    const formScheme = await formSchemeService.findByIdWithResults(
      form.form_scheme_id as number,
      form.id as number
    );

    res.status(200).json({
      form,
      form_scheme: formScheme,
    });
  });

  getUserForm = asyncErrorHandler(async (req, res) => {
    const userForm = await formService.findByFormSchemeId(
      FORM_SCHEMES.USER_FORM_ID,
      { id: req.decodedToken?.id as number }
    );

    const formScheme = await formSchemeService.findByIdWithResults(
      userForm.form_scheme_id as number,
      userForm.id as number
    );

    res.status(200).json({
      user_form: userForm,
      form_scheme: formScheme,
    });
  });

  verifyForm = asyncErrorHandler(async (req, res) => {
    const { id } = req.body;
    await formService.verifyForm(id, { id: req.decodedToken?.id as number });
    const form = await formService.updateDone(id, true, {
      id: req.decodedToken?.id as number,
    });

    res.status(200).json({
      message: "the form is done!",
      form,
    });
  });
}

const formController = new FormController();

export default formController;
