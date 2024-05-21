import userService from "../service/user-service";
import { Roles, User, UserArea } from "../types/user";
import crypPassword from "../utils/crypt-password";
import createForm from "./create-form";

const startDefaultValues = async () => {
  const password = await crypPassword("1234");

  await userService
    .saveAdmin({
      email: "admin@email.com",
      fullname: "admin",
      area: UserArea.admin,
      password: password,
      role: Roles.admin,
    } as User)
    .catch(() => {
      console.log("duplicated admin user");
    })
    .finally(() => {
      console.log("user admin created");
    });

  await createForm().catch((err) => {
    console.log(err);
    console.log("the first form is already created");
  });
};

export default startDefaultValues;
