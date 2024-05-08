import BlacklistRepository from "../respository/blacklist/blacklist-repository";
import MysqlBlacklistRepository from "../respository/blacklist/mysql-blacklist-repository";
import { Blacklist } from "../types/blacklist";

class BlacklistService extends BlacklistRepository {
  constructor(private readonly blacklistRespository: BlacklistRepository) {
    super();
  }

  async find(blacklist: Blacklist): Promise<Blacklist | undefined> {
    const foundBlacklist = this.blacklistRespository.find(blacklist);
    return foundBlacklist;
  }

  async save(blacklist: Blacklist): Promise<Blacklist> {
    return this.blacklistRespository.save(blacklist);
  }
}

const blacklistService = new BlacklistService(new MysqlBlacklistRepository());

export default blacklistService;
