import MysqlResultRepository from "../respository/result/mysql-result-repository";
import ResultRespository from "../respository/result/result-repository";
import { Result } from "../types/result";

class ResultService extends ResultRespository {
  constructor(private readonly resultRepository: ResultRespository) {
    super();
  }
  async findAllUserResults(result: Result): Promise<Result[]> {
    return this.resultRepository.findAllUserResults(result);
  }

  async save(result: Result): Promise<Result> {
    return this.resultRepository.save(result);
  }

  async addResponse(result: Result): Promise<Result> {
    const selectedResult = await this.resultRepository.findByUserIdAndFieldId(
      result
    );
    if (!selectedResult) {
      return this.resultRepository.save(result);
    }

    return this.resultRepository.update(result);
  }
}

const resultService = new ResultService(new MysqlResultRepository());

export default resultService;
