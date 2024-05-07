import { User } from "../types/user";
import crypPassword from "../utils/crypt-password";
import userService from "./user-service";

class AuthService {
  async signup(user: User): Promise<User> {
    user.password = await crypPassword(user.password || "");
    const createdUser = await userService.save(user);
    return createdUser;
  }
}

const authService = new AuthService();

export default authService;
