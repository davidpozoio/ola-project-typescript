import ERRORS from "../const/errors";
import FORM_SCHEMES from "../const/form-schemes-ids";
import { Blacklist } from "../types/blacklist";
import { Form } from "../types/form";
import { Roles, User } from "../types/user";
import crypPassword, { comparePassword } from "../utils/crypt-password";
import HttpError from "../utils/http-error";
import blacklistService from "./blacklist-service";
import formService from "./form-service";
import userService from "./user-service";

class AuthService {
  async signup(user: User): Promise<User> {
    user.password = await crypPassword(user.password || "");
    user.role = Roles.user;
    const createdUser = await userService.save(user);
    await formService.save({
      user_id: createdUser.id,
      form_scheme_id: 2,
    } as Form);

    return createdUser;
  }

  async login(user: User): Promise<User> {
    const loggedUser = await userService.findByEmail(user.email);

    if (!loggedUser.has_access) {
      throw new HttpError(ERRORS.USER_DOES_NOT_HAVE_ACCESS);
    }

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

  async logout(blacklist: Blacklist) {
    const isTokenBlacklisted = await blacklistService.find({
      user_id: blacklist.user_id,
      token: blacklist.token,
    } as Blacklist);

    if (isTokenBlacklisted) {
      throw new HttpError(ERRORS.JWT_IS_EXPIRED);
    }
    //black listing the token
    await blacklistService.save({
      user_id: blacklist.user_id,
      token: blacklist.token,
    } as Blacklist);
  }

  async verify(user: User) {
    const form = await formService.findByFormSchemeId(
      FORM_SCHEMES.USER_FORM_ID,
      { id: user.id as number }
    );

    if (!form.done) {
      throw new HttpError(ERRORS.USER_FORM_NOT_DONE);
    }

    if (user.documents.length === 0) {
      throw new HttpError(ERRORS.USER_NEEDS_DOCUMENTS);
    }

    if (
      !user.documents?.[0].name_card_back ||
      !user.documents?.[0].name_card_front ||
      !user.documents?.[0].name_video
    ) {
      throw new HttpError(ERRORS.USER_NEEDS_DOCUMENTS);
    }
    await userService.toogleVerification(true, { id: user.id as number });
  }
}

const authService = new AuthService();

export default authService;
