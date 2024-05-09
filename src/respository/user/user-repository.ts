import { User } from "../../types/user";
import Repository from "../repository";

export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    throw new Error("method not implemented");
  }

  async saveAdmin(user: User): Promise<User> {
    throw new Error("method not implemented");
  }

  async toggleAccessUser(access: boolean, userId: number): Promise<User> {
    throw new Error("method not implemented");
  }
}
