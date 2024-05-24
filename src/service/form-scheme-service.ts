import ERRORS from "../const/errors";
import FormSchemeRepository from "../respository/form-scheme/form-scheme-repository";
import MysqlFormSchemeRepository from "../respository/form-scheme/mysql-form-scheme-repository";
import { FormScheme } from "../types/form-scheme";
import HttpError from "../utils/http-error";

class FormSchemeService extends FormSchemeRepository {
  constructor(private readonly formSchemeRespository: FormSchemeRepository) {
    super();
  }

  async findAll(): Promise<FormScheme[]> {
    return this.formSchemeRespository.findAll();
  }

  async findById(id: string | number | undefined): Promise<FormScheme> {
    const formScheme = await this.formSchemeRespository.findById(id);
    if (!formScheme) {
      throw new HttpError(ERRORS.FORM_SCHEME_NOT_FOUND);
    }

    return formScheme;
  }

  async findByIdWithResults(
    id: string | number,
    formId: string | number
  ): Promise<FormScheme> {
    const formScheme = await this.formSchemeRespository.findByIdWithResults(
      id,
      formId
    );
    if (!formScheme) {
      throw new HttpError(ERRORS.FORM_SCHEME_NOT_FOUND);
    }

    return formScheme;
  }
}

const formSchemeService = new FormSchemeService(
  new MysqlFormSchemeRepository()
);

export default formSchemeService;
