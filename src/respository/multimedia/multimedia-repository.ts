import { Multimedia } from "../../types/multimedia";
import Repository from "../repository";

export default class MultimediaRepository extends Repository<Multimedia> {
  async deleteByHash(hash: string): Promise<Multimedia | undefined> {
    throw new Error("method not implemented");
  }

  async findByHash(hash: string): Promise<Multimedia | undefined> {
    throw new Error("method not implemented");
  }
}
