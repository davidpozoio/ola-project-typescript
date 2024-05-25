import { Multimedia } from "../../types/multimedia";
import Repository from "../repository";

export default class MultimediaRepository extends Repository<Multimedia> {
  async deleteByHash(hash: string): Promise<Multimedia> {
    throw new Error("method not implemented");
  }
}
