import { FormRepository } from "../respository/form/form-repository";
import { MysqlFormRepository } from "../respository/form/mysql-form-repository";
import { Form } from "../types/form";

class FormService extends FormRepository {
  constructor(private readonly formRepository: FormRepository) {
    super();
  }

  async findAll(): Promise<Form[]> {
    return this.formRepository.findAll();
  }

  async save(form: Form): Promise<Form> {
    return this.formRepository.save(form);
  }
}

const formService = new FormService(new MysqlFormRepository());

export default formService;
