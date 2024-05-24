import { FormScheme } from "../../types/form-scheme";
import Repository from "../repository";

export default class FormSchemeRepository extends Repository<FormScheme> {
  async findByIdWithResults(
    id: number | string,
    formId: number | string
  ): Promise<FormScheme> {
    throw new Error("method not implemented");
  }
}
