import ERRORS from "../const/errors";
import { User } from "../types/user";
import crypPassword, { comparePassword } from "../utils/crypt-password";
import HttpError from "../utils/http-error";
import userService from "./user-service";

class AuthService {
  async signup(user: User): Promise<User> {
    user.password = await crypPassword(user.password || "");
    const createdUser = await userService.save(user);
    return createdUser;
  }

  async login(user: User): Promise<User> {
    const loggedUser = await userService.findByEmail(user.email);
    const isPasswordValid = await comparePassword(
      user.password as string,
      loggedUser.password as string
    );

    if (!isPasswordValid) {
      throw new HttpError(ERRORS.INCORRECT_PASSWORD);
    }

    loggedUser.password = undefined;

    return loggedUser;
  }
}

const authService = new AuthService();

export default authService;
