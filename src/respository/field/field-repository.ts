import { Field } from "../../types/form-scheme";
import Repository, { Owner } from "../repository";

export default class FieldRepository extends Repository<Field> {
  async updateResult(field: Field): Promise<Field> {
    throw new Error("method not defined");
  }

  async findAllBySchemeId(
    formSchemeId: string | number,
    owner?: Owner
  ): Promise<Field[]> {
    throw new Error("method not defined");
  }
}
