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

  saveCardImages = asyncErrorHandler(async (req, res) => {
    const files = req.files;

    if (!files) {
      throw new HttpError(ERRORS.FILE_FORMAT_NOT_ALLOWED);
    }

    if (files?.length !== 2) {
      throw new HttpError(ERRORS.USER_CARD_IMAGES_MUST_BE_TWO);
    }

    const multimedias = await multimediaService.saveCardImages(
      files as Express.Multer.File[],
      req.decodedToken?.id as number
    );

    res.status(200).json({
      message: "card images upload successfully",
      multimedias,
    });
  });

  deleteByHash = asyncErrorHandler(async (req, res) => {
    const { hash } = req.params;
    console.log(hash);
    const file = await multimediaService.findByHash(hash);

    if (file.user_id !== req.decodedToken?.id) {
      throw new HttpError(ERRORS.FILE_NOT_FOUND);
    }

    await multimediaService.deleteByHash(hash);

    res.status(200).json({
      message: "file deleted successfully",
    });
  });

  saveVideo = asyncErrorHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
      throw new HttpError(ERRORS.FILE_FORMAT_NOT_ALLOWED);
    }

    const multimedia = await multimediaService.saveVideo(
      file as Express.Multer.File,
      req.decodedToken?.id as number
    );

    res.status(200).json({
      message: "the video was uploaded successfully",
      multimedia,
    });
  });
}

const multimediaController = new MultimediaController();

export default multimediaController;
