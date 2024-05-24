import ERRORS from "../const/errors";
import MysqlResultRepository from "../respository/result/mysql-result-repository";
import ResultRespository from "../respository/result/result-repository";
import { Result } from "../types/result";
import HttpError from "../utils/http-error";
import fieldService from "./field-service";
import formGroupService from "./form-group-service";
import formSchemeService from "./form-scheme-service";
import formService from "./form-service";

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
    const form = await formService.findById(result.form_id);
    const field = await fieldService.findById(result.field_id);
    const formGroup = await formGroupService.findById(field?.form_group_id);
    const formScheme = await formSchemeService.findById(
      formGroup.form_scheme_id
    );

    if (formScheme.id !== form.form_scheme_id) {
      throw new HttpError(ERRORS.FIELD_NOT_BELONG_TO_THE_PROVIDED_FORM);
    }

    const selectedResult = await this.resultRepository.findByFormIdAndFieldId(
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
