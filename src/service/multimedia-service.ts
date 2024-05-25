import ERRORS from "../const/errors";
import MultimediaRepository from "../respository/multimedia/multimedia-repository";
import MysqlMultimediaRepository from "../respository/multimedia/mysql-multimedia-repository";
import { Multimedia } from "../types/multimedia";
import HttpError from "../utils/http-error";
import fs from "fs/promises";

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
}

const multimediaService = new MultimediaService(
  new MysqlMultimediaRepository()
);

export default multimediaService;
