import ERRORS from "../const/errors";
import formService from "../service/form-service";
import { Form } from "../types/form";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { verifyHmacHash } from "../utils/generate-hmac-hash";
import HttpError from "../utils/http-error";

const requireLinkHash = asyncErrorHandler(async (req, res, next) => {
  const { hash } = req.params;

  const form = await formService.findByHash(hash);

  const isHashValid = verifyHmacHash({ form_id: form?.id as number }, hash);

  if (!isHashValid) {
    throw new HttpError(ERRORS.HASH_IS_NOT_VALID);
  }

  req.formId = form?.id;

  next();
});

export default requireLinkHash;
