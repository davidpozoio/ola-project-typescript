import { Form } from "../../types/form";
import Repository, { Owner } from "../repository";

export class FormRepository extends Repository<Form> {
  async addHash(form: Form): Promise<Form> {
    throw new Error("the method is not implemented");
  }

  async findByHash(hash: string): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }

  async removeHash(id: number | string): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }

  async setExpireTime(form: Form): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }

  async findAllByUserId(id: string | number): Promise<Form[]> {
    throw new Error("the method is not implemented");
  }

  async findByFormSchemeId(
    formSchemeId: string | number,
    owner?: Owner
  ): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }

  async updateDone(
    id: number,
    done: boolean,
    owner?: Owner
  ): Promise<Form | undefined> {
    throw new Error("the method is not implemented");
  }
}
