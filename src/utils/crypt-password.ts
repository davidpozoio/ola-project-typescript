import { genSalt, hash } from "bcrypt";

const crypPassword = async (password: string) => {
  const salt = await genSalt();
  return hash(password, salt);
};

export default crypPassword;
