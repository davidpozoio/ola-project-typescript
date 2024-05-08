import { Blacklist } from "../../types/blacklist";
import Repository from "../repository";

export default class BlacklistRepository extends Repository<Blacklist> {
  async find(blacklist: Blacklist): Promise<Blacklist | undefined> {
    throw new Error("method not implemented");
  }
}
