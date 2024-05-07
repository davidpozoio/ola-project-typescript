import MysqlUserRepository from "../respository/user/mysql-user-repository";
import { UserRepository } from "../respository/user/user-repository";
import { User } from "../types/user";

class UserService extends UserRepository {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

const userService = new UserService(new MysqlUserRepository());

export default userService;
