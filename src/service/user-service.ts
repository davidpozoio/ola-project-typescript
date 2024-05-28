import ERRORS from "../const/errors";
import { Owner } from "../respository/repository";
import MysqlUserRepository from "../respository/user/mysql-user-repository";
import { UserRepository } from "../respository/user/user-repository";
import { User } from "../types/user";
import HttpError from "../utils/http-error";

class UserService extends UserRepository {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user).catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        throw new HttpError(ERRORS.EMAIL_ALREADY_EXISTS);
      }

      return err;
    });
  }

  async saveAdmin(user: User): Promise<User> {
    return this.userRepository.saveAdmin(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError(ERRORS.USER_EMAIL_NOT_FOUND);
    }

    return user;
  }

  async findById(id: string | number | undefined): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpError(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }

  async toggleAccessUser(access: boolean, userId: number): Promise<User> {
    return this.userRepository.toggleAccessUser(access, userId);
  }

  async toogleVerification(
    verified: boolean,
    owner?: Owner | undefined
  ): Promise<User> {
    const user = await this.userRepository.toogleVerification(verified, owner);
    if (!user) {
      throw new HttpError(ERRORS.USER_NOT_FOUND);
    }

    return user;
  }
}

const userService = new UserService(new MysqlUserRepository());

export default userService;
