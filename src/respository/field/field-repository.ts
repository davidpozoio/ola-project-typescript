import { Field } from "../../types/form";
import Repository from "../repository";

export default class FieldRepository extends Repository<Field> {
  async updateResult(field: Field): Promise<Field> {
    throw new Error("method not defined");
  }
}
