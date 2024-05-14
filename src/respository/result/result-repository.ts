import { Result } from "../../types/result";
import Repository from "../repository";

export default class ResultRespository extends Repository<Result> {
  async findAllUserResults(result: Result): Promise<Result[]> {
    throw new Error("the method is not implemented");
  }

  async findByUserIdAndFieldId(result: Result): Promise<Result> {
    throw new Error("the method is not implemented");
  }
}
