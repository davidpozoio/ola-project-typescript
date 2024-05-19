import { Form } from "../../types/form";
import Repository from "../repository";

export class FormRepository extends Repository<Form> {
  async addHash(form: Form): Promise<Form> {
    throw new Error("the method is not implemented");
  }

  async findByHash(hash: string): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }
}
