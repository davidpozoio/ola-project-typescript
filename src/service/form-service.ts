import { FormRepository } from "../respository/form/form-repository";
import { MysqlFormRepository } from "../respository/form/mysql-form-repository";
import { Form } from "../types/form";
import crypto from "crypto";
import HttpError from "../utils/http-error";
import ERRORS from "../const/errors";
import { generateHmacHash } from "../utils/generate-hmac-hash";

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

  async findById(id: string | number | undefined): Promise<Form> {
    const form = await this.formRepository.findById(id);
    if (!form) {
      throw new HttpError(ERRORS.FORM_NOT_FOUND);
    }

    return form;
  }

  async addHash(form: Form): Promise<Form> {
    await this.findById(form.id);
    const hash = generateHmacHash({ form_id: form.id });
    form.hash = hash;

    return this.formRepository.addHash(form);
  }

  async findByHash(hash: string): Promise<Form> {
    const form = await this.formRepository.findByHash(hash);

    if (!form) {
      throw new HttpError(ERRORS.FORM_NOT_FOUND);
    }

    return form;
  }

  async removeHash(id: string | number): Promise<Form | undefined> {
    return this.formRepository.removeHash(id);
  }
}

const formService = new FormService(new MysqlFormRepository());

export default formService;
