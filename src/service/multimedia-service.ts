import MultimediaRepository from "../respository/multimedia/multimedia-repository";
import MysqlMultimediaRepository from "../respository/multimedia/mysql-multimedia-repository";
import { Multimedia } from "../types/multimedia";

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
}

const multimediaService = new MultimediaService(
  new MysqlMultimediaRepository()
);

export default multimediaService;
