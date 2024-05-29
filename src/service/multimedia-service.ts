import ERRORS from "../const/errors";
import MultimediaRepository from "../respository/multimedia/multimedia-repository";
import MysqlMultimediaRepository from "../respository/multimedia/mysql-multimedia-repository";
import { Multimedia } from "../types/multimedia";
import HttpError from "../utils/http-error";
import fs from "fs/promises";
import userService from "./user-service";

class MultimediaService extends MultimediaRepository {
  constructor(private readonly multimediaRepository: MultimediaRepository) {
    super();
  }

  async save(media: Multimedia): Promise<Multimedia> {
    return this.multimediaRepository.save(media);
  }

  async deleteById(id: string | number | undefined): Promise<Multimedia> {
    return this.multimediaRepository.deleteById(id);
  }

  async deleteByHash(hash: string): Promise<Multimedia | undefined> {
    const media = await this.multimediaRepository.deleteByHash(hash);
    if (!media) {
      throw new HttpError(ERRORS.FILE_NOT_FOUND);
    }

    await fs.unlink(`multimedia/${hash}`).catch(() => {
      throw new HttpError(ERRORS.FILE_NOT_FOUND);
    });

    return media;
  }

  async findByHash(hash: string): Promise<Multimedia> {
    const media = await this.multimediaRepository.findByHash(hash);

    if (!media) {
      throw new HttpError(ERRORS.FILE_NOT_FOUND);
    }

    return media;
  }

  async saveCardImages(files: Express.Multer.File[], userId: number | string) {
    const user = await userService.findById(userId);
    const cardImagesCount = user.multimedias.filter(
      (file) => file.type === "card_id"
    ).length;

    if (cardImagesCount === 2) {
      throw new HttpError(ERRORS.USER_HAS_ALREADY_CARD_IMAGES);
    }
    const multimedias: Multimedia[] = [];
    for (let file of files as Express.Multer.File[]) {
      multimedias.push(
        await multimediaService.save({
          hash: file.filename,
          user_id: userId,
          name: "card",
          type: "card_id",
        } as Multimedia)
      );
    }
    return multimedias;
  }

  async saveVideo(file: Express.Multer.File, userId: number | string) {
    const user = await userService.findById(userId);
    const countVideo = user.multimedias.filter(
      (file) => file.type === "video"
    ).length;

    if (countVideo === 1) {
      throw new HttpError(ERRORS.USER_HAS_ALREADY_A_VIDEO);
    }

    const multimedia = await multimediaService.save({
      hash: file.filename,
      name: "video",
      type: "video",
      user_id: userId,
    } as Multimedia);

    return multimedia;
  }
}

const multimediaService = new MultimediaService(
  new MysqlMultimediaRepository()
);

export default multimediaService;
