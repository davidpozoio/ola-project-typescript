import UserModel from "../../model/user-model";
import Repository from "../repository";

export default class SequelizeUserRepository extends Repository<UserModel> {
  async findAll(): Promise<UserModel[]> {
    const users = await UserModel.findAll();

    return users;
  }

  async save(user: UserModel): Promise<UserModel> {
    const createdUser = await UserModel.create(user);

    return createdUser;
  }
}
