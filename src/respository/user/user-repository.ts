import { User } from "../../types/user";
import Repository from "../repository";

export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    throw new Error("method not implemented");
  }
}
