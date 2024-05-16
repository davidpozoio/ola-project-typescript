import FormSchemeRepository from "../respository/form-scheme/form-scheme-repository";
import MysqlFormSchemeRepository from "../respository/form-scheme/mysql-form-scheme-repository";
import { FormScheme } from "../types/form-scheme";

class FormSchemeService extends FormSchemeRepository {
  constructor(private readonly formSchemeRespository: FormSchemeRepository) {
    super();
  }

  async findAll(): Promise<FormScheme[]> {
    return this.formSchemeRespository.findAll();
  }
}

const formSchemeService = new FormSchemeService(
  new MysqlFormSchemeRepository()
);

export default formSchemeService;
