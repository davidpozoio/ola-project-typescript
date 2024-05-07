import { genSalt, hash, compare } from "bcrypt";

export async function comparePassword(
  password: string,
  cryptedPassword: string
) {
  return compare(password, cryptedPassword);
}

export async function crypPassword(password: string) {
  const salt = await genSalt();
  return hash(password, salt);
}

export default crypPassword;
