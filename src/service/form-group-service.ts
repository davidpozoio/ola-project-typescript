import ERRORS from "../const/errors";
import FormGroupRepository from "../respository/form-group/form-group-repository";
import MysqlFormGroupRepository from "../respository/form-group/mysql-form-group-repository";
import { FormGroup } from "../types/form-scheme";
import HttpError from "../utils/http-error";

class FormGroupService extends FormGroupRepository {
  constructor(private readonly formGroupRespository: FormGroupRepository) {
    super();
  }

  async findById(id: string | number | undefined): Promise<FormGroup> {
    const formGroup = await this.formGroupRespository.findById(id);
    if (!formGroup) {
      throw new HttpError(ERRORS.FORM_GROUP_NOT_FOUND);
    }

    return formGroup;
  }
}

const formGroupService = new FormGroupService(new MysqlFormGroupRepository());

export default formGroupService;
