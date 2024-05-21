import ERRORS from "../const/errors";
import formService from "../service/form-service";
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

  if (form.expire_hash_time && form.expire_hash_time < new Date()) {
    await formService.removeHash(form.id as number);
    throw new HttpError(ERRORS.HASH_IS_EXPIRED);
  }

  req.formId = form?.id;

  next();
});

export default requireLinkHash;
