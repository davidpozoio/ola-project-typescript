import ERRORS from "../const/errors";
import multimediaService from "../service/multimedia-service";
import { Multimedia } from "../types/multimedia";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import HttpError from "../utils/http-error";

class MultimediaController {
  save = asyncErrorHandler(async (req, res) => {
    const { name } = req.body;

    if (!req.file) {
      throw new HttpError(ERRORS.FILE_FORMAT_NOT_ALLOWED);
    }

    const media = await multimediaService.save({
      name,
      user_id: req.decodedToken?.id,
      hash: req.file.filename,
    } as Multimedia);

    res.status(200).json({
      message: "the file was submitted succesfully!",
      media,
    });
  });
}

const multimediaController = new MultimediaController();

export default multimediaController;
