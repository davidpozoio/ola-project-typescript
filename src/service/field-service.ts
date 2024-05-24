import ERRORS from "../const/errors";
import FieldRepository from "../respository/field/field-repository";
import MysqlFieldRepository from "../respository/field/mysq-field-repository";
import { Field } from "../types/form-scheme";
import HttpError from "../utils/http-error";

class FieldService extends FieldRepository {
  constructor(private readonly fieldRespository: FieldRepository) {
    super();
  }

  async updateResult(field: Field): Promise<Field> {
    const updatedField = await this.fieldRespository.updateResult(field);
    return updatedField;
  }

  async findById(id: string | number | undefined): Promise<Field | undefined> {
    const field = await this.fieldRespository.findById(id);
    if (!field) {
      throw new HttpError(ERRORS.FIELD_NOT_FOUND);
    }

    return field;
  }
}

const fieldService = new FieldService(new MysqlFieldRepository());

export default fieldService;
