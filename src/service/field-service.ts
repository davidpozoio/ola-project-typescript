import FieldRepository from "../respository/field/field-repository";
import MysqlFieldRepository from "../respository/field/mysq-field-repository";
import { Field } from "../types/form";

class FieldService extends FieldRepository {
  constructor(private readonly fieldRespository: FieldRepository) {
    super();
  }

  async updateResult(field: Field): Promise<Field> {
    const updatedField = await this.fieldRespository.updateResult(field);
    return updatedField;
  }
}

const fieldService = new FieldService(new MysqlFieldRepository());

export default fieldService;
