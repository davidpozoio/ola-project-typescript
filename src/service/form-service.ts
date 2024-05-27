import { FormRepository } from "../respository/form/form-repository";
import { MysqlFormRepository } from "../respository/form/mysql-form-repository";
import { Form } from "../types/form";
import crypto from "crypto";
import HttpError from "../utils/http-error";
import ERRORS from "../const/errors";
import { generateHmacHash } from "../utils/generate-hmac-hash";
import { Owner } from "../respository/repository";
import fieldService from "./field-service";
import resultService from "./result-service";

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

  async findById(
    id: string | number | undefined,
    owner?: Owner
  ): Promise<Form> {
    const form = await this.formRepository.findById(id, owner);
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

  async setExpireTime(form: Form): Promise<Form | undefined> {
    form.expire_hash_time = new Date(new Date().getTime() + 1 * 60000);
    return this.formRepository.setExpireTime(form);
  }

  async findAllByUserId(id: string | number): Promise<Form[]> {
    return this.formRepository.findAllByUserId(id);
  }

  async findByFormSchemeId(
    formSchemeId: string | number,
    owner?: Owner
  ): Promise<Form> {
    const form = await this.formRepository.findByFormSchemeId(
      formSchemeId,
      owner
    );

    if (!form) {
      throw new HttpError(ERRORS.FORM_NOT_FOUND);
    }

    return form;
  }

  async verifyForm(id: string | number, owner?: Owner): Promise<void> {
    const form = await this.findById(id, owner);
    const fields = await fieldService.findAllBySchemeId(
      form.form_scheme_id as number
    );
    const results = await resultService.findAllByFormId(id);

    if (fields.length !== results.length) {
      throw new HttpError(ERRORS.RESULTS_NOT_ENOUGH);
    }

    for (let result of results) {
      if (!result.response.value) {
        throw new HttpError(ERRORS.RESULTS_ARE_VOID);
      }
    }
  }

  async updateDone(
    id: number,
    done: boolean,
    owner?: Owner | undefined
  ): Promise<Form> {
    const form = await this.formRepository.updateDone(id, done, owner);

    if (!form) {
      throw new HttpError(ERRORS.FORM_NOT_FOUND);
    }

    return form;
  }
}

const formService = new FormService(new MysqlFormRepository());

export default formService;
